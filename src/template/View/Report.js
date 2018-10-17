import {
  observable,
  computed
} from "mobx";
import {
  assignId
} from './util';

class Style {
  view;
  key;

  @observable name;
  @observable heightExpr;
  @observable widthExpr;

  @computed get height() {
    return this.view.execExpr(this.heightExpr);
  }

  set height(heightExpr) {
    this.heightExpr = this.view.parseExpr(heightExpr);
  }

  @computed get width() {
    return this.view.execExpr(this.widthExpr);
  }

  set width(widthExpr) {
    this.widthExpr = this.view.parseExpr(widthExpr);
  }

  constructor(view, name, heightExpr = '300', widthExpr = '100%') {


    this.key = assignId();
    this.view = view;
    this.name = name || 'Style' + this.key;

    this.heightExpr = this.view.parseExpr(heightExpr);
    this.widthExpr = this.view.parseExpr(widthExpr);
  }

  static create(view, object = {}) {
    return new Style(view, object.name, object.height, object.width);
  }
}

export class Chart {
  view;
  key;

  @observable name;
  @observable typeExpr;
  @observable style;

  get type(){
    return 'chart';
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get type() {
    return this.view.execExpr(this.typeExpr);
  }

  set type(typeExpr) {
    this.typeExpr = this.view.parseExpr(typeExpr);
  }

  constructor(view, name, typeExpr, style) {
    assert(view);

    this.key = assignId();
    this.view = view;
    this.name = name || 'Chart' + this.key;

    this.typeExpr = view.parseExpr(typeExpr);
    this.style = style;
  }

  static create(view, object) {
    return new Chart(view, object.name, object.type, Style.create(view, object.style));
  }
}
