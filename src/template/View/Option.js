import {
  observable,
  computed
} from "mobx";
import {
  Action
} from './Action';
import {
  Input
} from './Input';
import {
  assignId
} from './util';

class ActionItem {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;

  @observable onClick;

  @computed get text() {
    return this.view.execExpr(this.textExpr);
  }
  @computed get icon() {
    return this.view.execExpr(this.iconExpr);
  }
  @computed get disable() {
    return this.view.execExpr(this.disableExpr);
  }
  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }

  constructor(view, name, text, icon, disableExpr = false, visibleExpr = true, onClick) {
    this.view = view;
    this.key = assignId('Item');
    this.name = name || this.key;
    this.textExpr = this.view.parseExpr(text);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);

    this.onClick = onClick;
  }

  static create(view, obj) {
    const {
      name,
      title,
      text,
      icon,
      disable,
      visible,
      ...action
    } = obj;
    return new ActionItem(view, name, title || text, icon, disable, visible, Action.create(view, {
      name: 'goto',
      ...action
    }));
  }
}

class OptionItem {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable descriptionExpr;
  @observable tipExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;

  @observable allgroups;
  @observable btns;

  @observable inputItem;

  @computed get state() {
    return this.view.state;
  }

  @computed get type() {
    return this.view.execExpr(this.typeExpr);
  }
  @computed get groups() {
    return this.allgroups.filter(it => it.visible);
  }
  @computed get text() {
    return this.view.execExpr(this.textExpr);
  }
  @computed get description() {
    return this.view.execExpr(this.descriptionExpr);
  }
  @computed get tip() {
    return this.view.execExpr(this.tipExpr);
  }
  @computed get icon() {
    return this.view.execExpr(this.iconExpr);
  }
  @computed get disable() {
    return this.view.execExpr(this.disableExpr);
  }
  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }

  constructor(view, name, text, description, tip, icon, disableExpr = false, visibleExpr = true, inputItem, btns = [], groups) {
    this.view = view;
    this.key = assignId('Item');
    this.name = name || this.key;
    this.textExpr = this.view.parseExpr(text);
    this.descriptionExpr = this.view.parseExpr(description);
    this.tipExpr = this.view.parseExpr(tip);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);

    this.allgroups = groups;
    this.btns = btns;
    this.inputItem = inputItem;
  }

  static create(view, obj) {
    let child;
    if (obj.child) {
      child = obj.child;
    } else {
      child = [];
    }
    if (!Array.isArray(child)) {
      child = [child];
    }
    return new OptionItem(view, obj.name, obj.title || obj.text, obj.description, obj.tip, obj.icon, obj.disable, obj.visible,
      Input.create(view, obj),
      (obj.btns || []).map(it => ActionItem.create(view, it)),
      child.filter(it => it.type === 'group' || it.type === 'list').map(it => OptionGroup.create(view, it)));
  }
}

class OptionGroup {
  view;
  key;

  @observable allgroups;
  @observable allitems;

  @observable typeExpr;
  @observable name;
  @observable textExpr;
  @observable descriptionExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;

  @observable btns;

  @computed get state() {
    return this.view.state;
  }
  @computed get groups() {
    return this.allgroups.filter(it => it.visible);
  }
  @computed get items() {
    return this.allitems.filter(it => it.visible);
  }
  @computed get type() {
    return this.view.execExpr(this.typeExpr);
  }
  @computed get text() {
    return this.view.execExpr(this.textExpr);
  }
  @computed get description() {
    return this.view.execExpr(this.descriptionExpr);
  }
  @computed get icon() {
    return this.view.execExpr(this.iconExpr);
  }
  @computed get disable() {
    return this.view.execExpr(this.disableExpr);
  }
  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }

  constructor(view, type, name, text, description, icon, disableExpr = false, visibleExpr = true, groups = [], items = [], btns = []) {
    this.view = view;
    this.key = assignId('OptionGroup');
    this.name = name || this.key;
    this.typeExpr = this.view.parseExpr(type);
    this.textExpr = this.view.parseExpr(text);
    this.descriptionExpr = this.view.parseExpr(description);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);

    this.allgroups = groups;
    this.allitems = items;
    this.allbtns = btns;
  }

  static create(view, obj) {
    const items = obj.items || [];
    let btns = obj.btns || [];
    if (!Array.isArray(btns)) {
      btns = [btns];
    }
    return new OptionGroup(view, obj.type, obj.name, obj.title || obj.text, obj.description, obj.icon, obj.disable, obj.visible,
      items.filter(it => it.type === 'group' || it.type === 'list').map(it => OptionGroup.create(view, it)),
      items.filter(it => it.type !== 'group' && it.type !== 'list').map(it => OptionItem.create(view, it)),
      btns.map(it => ActionItem.create(view, it)));
  }
}

export class ListGroup {
  view;
  key;

  @observable name;
  @observable allgroups;

  @observable gutterExpr;

  @observable onBeforeChange;
  @observable onChange;
  @observable onAfterChange;

  get type() {
    return 'listgroup';
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get groups() {
    return this.allgroups.filter(it => it.visible);
  }

  @computed get gutter() {
    // 24列布局
    const span = parseInt(this.view.execExpr(this.gutterExpr));
    return span !== 0 ? (span) : 16;
  }

  constructor(view, name, gutterExpr = 16, groups = [], onBeforeChange, onChange, onAfterChange) {
    //assert(view);
    this.key = assignId('ListGroup');
    this.view = view;
    this.name = name || this.key;
    this.allgroups = groups;
    this.gutterExpr = view.parseExpr(gutterExpr);

    this.onBeforeChange = onBeforeChange;
    this.onChange = onChange;
    this.onAfterChange = onAfterChange;
  }

  static create(view, object) {
    let groups, name, gutter,
      onChanging,onChange,onChanged;

    if (Array.isArray(object)) {
      groups = object;
    } else if (object.groups || object.items) {
      groups = object.groups || object.items || [];
      name = object.name;
      gutter = object.gutter;
      onChanging=object.onChanging;
      onChange=object.onChange;
      onChanged=object.onChanged;
    } else {
      groups = [object];
    }
    if (!Array.isArray(groups)) {
      groups = [groups];
    }
    return new ListGroup(view, name, gutter, groups.map(it => OptionGroup.create(view, it)),
      Action.create(view, onChanging), Action.create(view, onChange), Action.create(view, onChanged));
  }
}
