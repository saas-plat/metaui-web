import {
  observable,
  computed,
  toJS
} from "mobx";
import {
  assignId
} from './util';

export class Action {
  view;
  key;

  @observable nameExpr;
  @observable args;

  // 需要执行actions方法名称
  @computed get name() {
    return this.view.execExpr(this.nameExpr);
  }
  set name(nameExpr) {
    this.nameExpr = this.view.parseExpr(nameExpr);
  }

  constructor(view, name, args = {}) {
    this.key = assignId();
    this.view = view;
    this.nameExpr = this.view.parseExpr(name);
    const obj = {};
    const exprs = new Map();
    this.keys = Object.keys(args);
    this.keys.forEach(key => {
      exprs.set(key, view.parseExpr(args[key]));
      Object.defineProperty(obj, key, {
        enumerable: true, // 这里必须是可枚举的要不observable不好使
        get: () => {
          return view.execExpr(exprs.get(key));
        },
        set: (expr) => {
          exprs.set(key, view.parseExpr(expr));
        }
      });
    });
    this.args = observable(obj);
  }

  toJS() {
    const $args = this.args;
    return {
      name: this.nameExpr.toString(),
      args: this.keys.reduce((obj, key) => {
        obj[key] = $args[key];
        return obj;
      }, {})
    }
  }

  static create(view, obj) {
    if (typeof obj === 'string') {
      return new Action(view, obj);
    } else if (Array.isArray(obj)) {
      return obj.map(it => Action.create(view, it));
    } else if (obj) {
      const {
        name,
        args,
        ...other
      } = obj;
      return new Action(view, name, { ...other,
        ...args
      });
    } else {
      return null;
    }
  }
}
