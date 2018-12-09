import {
  observable
} from "mobx";
import Expression from 'saas-plat-expression';
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

export default class ViewStore {
  @observable model;

  constructor(model) {
    this.model = model;
  }

  parseExpr(txt) {
    return new Expression(txt);
  }

  execExpr(expr) {
    return expr.exec(this.model);
  }

  static create(obj = {}, model) {
    const store = new ViewStore(model);
    const type = (obj.type || '').toLowerCase();
    switch (type) {
    case 'toolbar':
      return Toolbar.create(store, obj);
    case 'form':
      return Form.create(store, obj);
    case 'cardform':
      return CardForm.create(store, obj);
    case 'tree':
      return Tree.create(store, obj);
    case 'table':
      return Table.create(store, obj);
    case 'chart':
      return Chart.create(store, obj);
    case 'listgroup':
      return ListGroup.create(store, obj);
    default:
      console.error('not support view type', obj.type);
      return null;
    }
  }
}
