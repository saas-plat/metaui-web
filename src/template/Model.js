import {
  observable,
  extendObservable,
  toJS,
  action
} from "mobx";
import moment from 'moment';
import {
  message
} from 'antd';
import {
  log,Expression
} from 'saas-plat-clientfx';
const {
  warn
} = log;
import schema from 'async-validator';

export const metaSymbol = Symbol("meta");
export const validatorSymbol = Symbol("validator");
export const storeSymbol = Symbol("store");

const findValue = (obj, path, index) => {
  if (index > path.length - 1) {
    return obj;
  }
  if (!obj) {
    return null;
  }
  const key = path[index];
  const val = obj[key];
  return findValue(val, path, index + 1);
}

export default class ViewModel {

  // 数据直接定义成属性
  // @observable id;
  // @observable state; // NEW EDIT READONLY CHANGE

  getValue(keyPath = '') {
    const path = keyPath.split('.');
    return findValue(this, path, 0);
  }

  @action setValue(value = {}) {
    Object.keys(value || {}).forEach(key => {
      const exists = this[metaSymbol].find(it => it.key === key);
      if (exists) {
        log('set value ' + key + ' = ' + value[key]);
        switch (exists.type) {
        case 'array':
          // todo 数组赋值有可能需要支持每个索引对象赋值的支持
          // 不是每次都会改变一个数组对象的可能
          this[key].length = 0;
          this[key].concat(value[key]);
          break;
        case 'object':
          Object.keys(value[key]).forEach(p => {
            this[key][p] = value[key][p];
          });
          break;
        case 'expr':
          log(key + ' is expression, skip load data.');
          break;
        case 'string':
        case 'number':
        case 'bool':
        default:
          if (key === 'id' && this[key]) {
            warn('id can not be modify, skip set id = ' + value[key]);
            break;
          }
          this[key] = value[key];
        }
      } else {
        log(key + 'is not exists, skip load data.');
      }
    });
  }

  @action mergeValue() {

  }

  constructor(store, meta = []) {
    this[storeSymbol] = store;
    if (meta.length <= 0) {
      log('view model not has specific fields!');
    }
    // 保证定义了id和state
    const idField = meta.find(it => it.key === 'id');
    const codeField = meta.find(it => it.key === 'code');
    const stateField = meta.find(it => it.key === 'state');
    const errorsField = meta.find(it => it.key === 'errors');
    if (!idField) {
      meta.push({
        key: 'id',
        type: 'string',
        default: ''
      });
    }
    if (!codeField) {
      meta.push({
        key: 'code',
        type: 'string',
        default: ''
      });
    }
    if (!stateField) {
      meta.push({
        key: 'state',
        type: 'string',
        default: 'READONLY'
      });
    }
    if (!errorsField) {
      meta.push({
        key: 'errors',
        type: 'array',
        fields: []
      });
    }
    // meta 默认不可以枚举和配置
    Object.defineProperty(this, metaSymbol, {
      value: meta
    });
    const exprs = observable.map();
    const define = (fields) => {
      const defineObj = {};
      fields.forEach(it => {
        switch (it.type) {
        case 'array':
          defineObj[it.key] = it.default || [];
          break;
        case 'object':
          {
            const subobj = define(it.fields);
            // object  不需要映射成map处理，每个字段都是定义出来的
            defineObj[it.key] = subobj;
          }
          break;
        case 'string':
          defineObj[it.key] = it.default || '';
          break;
        case 'number':
          defineObj[it.key] = it.default || 0;
          break;
        case 'date':
        case 'time':
        case 'datetime':
          defineObj[it.key] = moment(it.default || new Date());
          break;
        case 'expr':
          exprs.set(it.key, new Expression(it.expr));
          // getter setter 自动转成计算属性
          Object.defineProperty(defineObj, it.key, {
            enumerable: true, // 这里必须是可枚举的要不extendObservable不好使
            get: () => {
              return exprs.get(it.key).exec(this);
            },
            set: (expr) => {
              exprs.set(it.key, new Expression(expr));
            }
          });
          return;
        default:
          defineObj[it.key] = it.default || null;
        }
      });
      return defineObj;
    }
    const descript = (fields) => {
      const descriptor = {};
      fields.forEach(it => {
        // todo https://github.com/yiminghe/async-validator
      });
      return descriptor;
    }
    extendObservable(this, define(this[metaSymbol]));
    this[validatorSymbol] = new schema(descript(this[metaSymbol]));
  }

  validate() {
    return new Promise((resolve, reject) => {
      this.errors.length = 0;
      this[validatorSymbol].validate(this.toJS(), (errors) => {
        if (errors) {
          this.errors = this.errors.concat(errors);
          errors.forEach(err => message.error(err.message));
          return reject(false);
        }
        const {
          view,
          viewModel,
          ruleset
        } = this[storeSymbol].instances.get(this.id);
        this[storeSymbol].executeRule(ruleset, {
          name: 'model.validate'
        }, {
          view,
          viewModel
        }).then(() => {
          resolve(this.errors.length === 0);
        }).catch(err => {
          warn(err.message);
          return reject(false);
        })
      });
    });
  }

  toJS() {
    const getJs = (inst, fields) => {
      const obj = {};
      fields.forEach(it => {
        if (it.type === 'object') {
          obj[it.key] = getJs(inst[it.key], it.fields);
        } else {
          obj[it.key] = toJS(inst[it.key]);
        }
      });
      return obj;
    }
    return getJs(this, this[metaSymbol]);
  }

  static create(store, obj) {
    const types = ["string", "object", "bool", "array", "number", "expr", "date", "time", "datetime"];
    const getMeta = (obj) => {
      const meta = [];
      obj && Object.keys(obj).forEach(key => {
        let type;
        let expr;
        let fields;
        let devValue;
        if (typeof obj[key] === 'string') {
          type = types.indexOf(obj[key].toLowerCase()) > -1 ?
            obj[key].toLowerCase() :
            'expr';
          if (type === 'expr') {
            expr = obj[key];
          }
        } else if (obj[key].type) {
          type = obj[key].type;
          expr = obj[key].expr;
          fields = type === 'object' ?
            getMeta(obj[key].fields) :
            undefined;
          devValue = obj[key].default;
        } else if (Array.isArray(obj[key])) {
          type = 'array';
        } else if (typeof obj[key] === 'object') {
          type = 'object';
          fields = getMeta(obj[key]);
        } else {
          warn('not support type', key);
          return;
        }
        meta.push({
          key,
          type,
          expr,
          fields,
          default: devValue
        });
      });
      return meta;
    }
    return new ViewModel(store, getMeta(obj));
  }
}
