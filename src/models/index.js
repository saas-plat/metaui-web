
import {
  computed,
  observable
} from "mobx";
import {
  log
} from 'saas-plat-clientfx';
import Expression from 'saas-plat-expression';
const {
  warn
} = log;
import {
  assignId
} from './util';
import {
  CardForm
} from './Voucher';
import {
  Tree,
  Table
} from './VoucherList';
import {
  Chart
} from './Report';
import {
  ListGroup
} from './Option';
import {
  Toolbar
} from './Toolbar';
import {
  Action
} from './Action';

export default class View {
  key;
  @observable name;

  @observable items;

  @computed get toolbar() {
    return this.items.find(it => it.type === 'toolbar');
  }
  @computed get footbar() {
    return this.items.find(it => it.type === 'footbar');
  }

  @computed get listGroup() {
    return this.items.find(it => it.type === 'listgroup');
  }
  @computed get cardForm() {
    return this.items.find(it => it.type === 'cardform');
  }
  @computed get total() {
    return this.items.find(it => it.type === 'total');
  }
  @computed get report() {
    return this.items.find(it => it.type === 'dataTable');
  }
  @computed get chart() {
    return this.items.find(it => it.type === 'chart');
  }
  @computed get tree() {
    return this.items.find(it => it.type === 'tree');
  }
  @computed get table() {
    return this.items.find(it => it.type === 'table');
  }

  @observable stateExpr;

  vm;
  type;

  @observable onLoading;
  @observable onLoad;
  @observable onLoaded;

  @computed get state() {
    return (this.execExpr(this.stateExpr) || this.vm.state).toUpperCase();
  }

  constructor(name, type = 'noview', stateExpr = '$state', vm) {
    this.key = assignId('View');
    this.name = name || this.key;
    this.type = type;
    this.stateExpr = this.parseExpr(stateExpr);
    this.vm = vm;
  }

  parseExpr(txt) {
    return new Expression(txt);
  }

  execExpr(expr) {
    return expr.exec(this.vm);
  }

  toJS() {
    return null; //todo
  }

  static create(obj = {}, vm = {}) {
    const onLoading = obj.onLoading;
    const onLoad = obj.onLoad;
    const onLoaded = obj.onLoaded;
    let type;
    // 支持依稀同义词
    switch (obj.type.toLowerCase()) {
    case 'setting':
      type = 'option';
      break;
    case 'list':
      type = 'voucherlist';
      break;
    case 'card':
    case 'form':
      type = 'voucher';
      break;
    case 'chart':
      type = 'report';
      break;
    default:
      type = obj.type.toLowerCase();
    }
    const v = new View(obj.name, type, obj.state, vm);
    v.onLoading = Action.create(v, onLoading);
    v.onLoad = Action.create(v, onLoad || 'loadData');
    v.onLoaded = Action.create(v, onLoaded);
    v.items = (obj.items || []).map(it => {
      const type = (it.type || '').toLowerCase();
      switch (type) {
      case 'toolbar':
        return Toolbar.create(v, it);
      case 'footbar':
        return Toolbar.create(v, it);
      case 'cardform':
        return CardForm.create(v, it);
      case 'tree':
        return Tree.create(v, it);
      case 'table':
        return Table.create(v, it);
      case 'chart':
        return Chart.create(v, it);
      case 'listgroup':
        return ListGroup.create(v, it);
      default:
        warn('not support view type', it.type);
        return null;
      }
    }).filter(it => it);
    return v;
  }
}
