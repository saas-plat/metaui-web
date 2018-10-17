import {
  observable,
  computed
} from "mobx";
import {
  assignId
} from './util';
import {
  Action
} from './Action';

export class Item {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;
  @observable onClick;

  @observable allitems;

  @computed get items(){
    return this.allitems.filter(it=>it.visible);
  }

  get type(){
    return 'item';
  }

  @computed get disable() {
    return this.view.execExpr(this.disableExpr);
  }
  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get text() {
    return this.view.execExpr(this.textExpr);
  }
  set text(textExpr) {
    this.textExpr = this.view.parseExpr(textExpr);
  }
  @computed get icon() {
    return this.view.execExpr(this.iconExpr);
  }
  set icon(iconExpr) {
    this.iconExpr = this.view.parseExpr(iconExpr);
  }

  constructor(view, name, text, icon, disableExpr = false, visibleExpr = true, onClick, items = []) {
    this.key = assignId();
    this.view = view;
    this.name = name || 'Item' + this.key;
    this.textExpr = this.view.parseExpr(text);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.onClick = onClick;
    this.allitems = items;
  }

  static create(view, obj) {
    return new Item(view, obj.name, obj.text, obj.icon,  obj.disable, obj.visible, Action.create(view, obj.onClick), obj.items && obj.items.map(it => Item.create(view, it)));
  }
}

class ItemGroup {
  view;
  key;

  @observable allitems;
  @observable pull;

  get type(){
    return 'itemGroup';
  }

  @computed get items(){
    return this.allitems.filter(it=>it.visible);
  }

  constructor(view, pull = 'right', items = []) {
    this.key = assignId();
    this.view = view;
    this.pull = pull;
    this.allitems = items;
  }

  static create(view, obj = {}) {
    return new ItemGroup(view, view.pull, obj.items && obj.items.map(it => Item.create(view, it)));
  }
}

export class Toolbar {
  view;
  key;
  type;

  @observable allgroups;
  @observable textExpr;

  @observable disableExpr;
  @observable visibleExpr;

  @computed get groups(){
    return this.allgroups.filter(it=>it.items.length>0);
  }

  @computed get disable() {
    return this.view.execExpr(this.disableExpr);
  }
  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }

  @computed get text() {
    return this.view.execExpr(this.textExpr);
  }
  set text(textExpr) {
    this.textExpr = this.view.parseExpr(textExpr);
  }

  constructor(view, type, text, disableExpr = false, visibleExpr = true, groups = []) {
    this.key = assignId();
    this.view = view;
    this.type = type;
    this.textExpr = this.view.parseExpr(text);
    this.allgroups = groups;
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
  }

  static create(view, obj = {}) {
    let groups;
    if (obj.groups) {
      groups = obj.groups;
    } else if (obj.items) {
      groups = [{
        items: obj.items
      }];
    } else {
      groups = [];
    }
    return new Toolbar(view, obj.type, obj.text, obj.disable, obj.visible, groups.map(it => ItemGroup.create(view, it)));
  }
}
