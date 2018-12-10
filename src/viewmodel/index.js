import {
  observable,
  computed
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

  createViewModel(obj) {
    const type = (obj.type || '').toLowerCase();
    switch (type) {
    case 'toolbar':
      return Toolbar.create(this, obj);
    case 'form':
      return Form.create(this, obj);
    case 'cardform':
      return CardForm.create(this, obj);
    case 'tree':
      return Tree.create(this, obj);
    case 'table':
      return Table.create(this, obj);
    case 'chart':
      return Chart.create(this, obj);
    case 'listgroup':
      return ListGroup.create(this, obj);
    default:
      return null;
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
