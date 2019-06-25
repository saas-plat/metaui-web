import {
  observable,
  computed
} from "mobx";
import Expression from 'saas-plat-expression';
import {
  Input
} from './Input';
import {
  Form,
  CardForm
} from './Form';
import {
  Tree,
  Table
} from './FormList';
import {
  Chart
} from './Chart';
import {
  ListGroup
} from './Option';
import {
  Toolbar
} from './Toolbar';
import {
  t
} from '../translater';
import _get from 'lodash/get';

export default class ViewStore {
  @observable model;

  constructor(model) {
    this.model = model;
  }

  @computed get state() {
    return _get(this.model, 'state', null);
  }

  parseExpr(txt) {
    return new Expression(txt);
  }

  execExpr(expr) {
    return expr.exec(this.model);
  }

  map(obj, mapping) {
    if (!mapping) {
      return obj;
    }
    const expr = new Expression(mapping);
    // 这里是有个问题，要是调用了异步函数，这里需要await
    // 异步函数表达式还没有支持
    if (expr.tree) {
      return expr.exec(obj);
    } else {
      return {};
    }
  }

  createViewModel(obj) {
    const type = (obj.type || '').toLowerCase();
    const ViewItemClass = ViewStore.ViewItemClasses.get(type);
    if (!ViewItemClass) {
      console.error('view class not be found!', type);
      return null;
    }
    const viewItem = ViewItemClass.create(this, obj);
    if (!viewItem) {
      console.error('view item create failed!', type);
      return null;
    }
    return viewItem;
  }

  static ViewItemClasses = new Map();

  static register(...items) {
    const registerOne = (type, ViewItemClass) => {
      if (!type) {
        console.error('view type not be null!', type);
        return false;
      }
      if (!ViewItemClass) {
        console.error('view class not be null!', type);
        return false;
      }
      if (typeof ViewItemClass.create !== 'function') {
        console.error('view class can not be create!');
        return false;
      }
      if (ViewStore.ViewItemClasses.has(type.toLowerCase())) {
        console.error('view type has registerd!', type.toLowerCase());
        return false;
      }
      ViewStore.ViewItemClasses.set(type.toLowerCase(), ViewItemClass);
      return true;
    }
    if (typeof items[0] === 'string') {
      return registerOne(...items);
    } else if (typeof items[0] === 'object') {
      const keys = Object.keys(items[0]);
      let hasFaield = false;
      for (const key of keys) {
        if (!registerOne(key, items[0][key])) {
          hasFaield = true;
        }
      }
      return hasFaield;
    } else {
      let hasFaield = false;
      for (const it of items) {
        if (!registerOne(it.type || it.name, it.viewModel || it.view || it.model)) {
          hasFaield = true;
        }
      }
      return hasFaield;
    }
  }

  static create(obj = {}, model) {
    const store = new ViewStore(model);
    const viewModel = store.createViewModel(obj);
    if (!viewModel) {
      console.error('not support view type', obj.type);
    }
    return viewModel;
  }
}

ViewStore.register({
  // common
  'toolbar': Toolbar,
  //  input
  'text': Input,
  'textbox': Input,
  'input': Input,
  'textarea': Input,
  'number': Input,
  'check': Input,
  'checkbox': Input,
  'switch': Input,
  'date': Input,
  'datetime': Input,
  'month': Input,
  'daterange': Input,
  'week': Input,
  'time': Input,
  'select': Input,
  'listselect': Input,
  'treeselect': Input,
  'refselect': Input,
  'treetableselect': Input,
  'inputtable': Input,

  // form
  'form': Form,
  'cardform': CardForm,
  'listgroup': ListGroup,

  // display
  'treetable': Tree,
  'table': Table,
  'chart': Chart
});
