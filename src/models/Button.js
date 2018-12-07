import {
  observable,
  computed
} from "mobx";
import {
  Action
} from './Action';
import {assignId} from './util';

export class Button {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;
  @observable onClick ;

  get type(){
    return 'button';
  }

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


  constructor(view, name, textExpr, iconExpr, disableExpr = false, visibleExpr = true, onClick) {
     this.key = assignId();
    this.view = view;
    this.name = name || 'Button' + this.key;
    this.text = view.parseExpr(textExpr);
    this.iconExpr = view.parseExpr(iconExpr);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.onClick = onClick;
  }

  static create(view, object) {
    return new Button(view, object.name, object.text, object.disable, object.visible, Action.create(view,object.onClick));
  }
}
