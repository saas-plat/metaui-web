import {
  observable,
  computed
} from "mobx";
import {
  assignId,
  createView
} from './util';

export class Column {
  view;
  key;

  @observable children;

  // 单元格编辑器
  @observable inputItem;

  @observable visibleExpr;
  @observable disabledExpr;

  @observable alignExpr;
  @observable colSpanExpr;
  @observable dataIndexExpr;
  @observable fixedExpr;
  @observable titleExpr;
  @observable widthExpr;

  get type() {
    return 'column';
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get visible() {
    return this.view.execExpr(this.visibleExpr);
  }
  set visible(visibleExpr) {
    this.visibleExpr = this.view.parseExpr(visibleExpr);
  }
  @computed get disabled() {
    return this.view.execExpr(this.disabledExpr);
  }
  set disabled(disabledExpr) {
    this.disabledExpr = this.view.parseExpr(disabledExpr);
  }

  @computed get align() {
    return this.view.execExpr(this.alignExpr);
  }
  set align(alignExpr) {
    this.alignExpr = this.view.parseExpr(alignExpr);
  }
  @computed get colSpan() {
    return this.view.execExpr(this.colSpanExpr);
  }
  set colSpan(colSpanExpr) {
    this.colSpanExpr = this.view.parseExpr(colSpanExpr);
  }
  @computed get dataIndex() {
    return this.view.execExpr(this.dataIndexExpr);
  }
  set dataIndex(dataIndexExpr) {
    this.dataIndexExpr = this.view.parseExpr(dataIndexExpr);
  }
  @computed get fixed() {
    return this.view.execExpr(this.fixedExpr);
  }
  set fixed(fixedExpr) {
    this.fixedExpr = this.view.parseExpr(fixedExpr);
  }
  @computed get title() {
    return this.view.execExpr(this.titleExpr);
  }
  set title(titleExpr) {
    this.titleExpr = this.view.parseExpr(titleExpr);
  }
  @computed get width() {
    return this.view.execExpr(this.widthExpr);
  }
  set width(widthExpr) {
    this.widthExpr = this.view.parseExpr(widthExpr);
  }

  constructor(view, inputItem, visibleExpr = true, disabledExpr = false, alignExpr,
    colSpanExpr, dataIndexExpr, fixedExpr, titleExpr, widthExpr, children = null) {
    this.key = assignId();
    this.view = view;

    this.inputItem = inputItem;
    this.alignExpr = view.parseExpr(alignExpr);
    this.colSpanExpr = view.parseExpr(colSpanExpr);
    this.dataIndexExpr = view.parseExpr(dataIndexExpr);
    this.fixedExpr = view.parseExpr(fixedExpr);
    this.titleExpr = view.parseExpr(titleExpr);
    this.widthExpr = view.parseExpr(widthExpr);
    this.disabledExpr = view.parseExpr(disabledExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.children = children;
  }

  static create(view, object = {}, options = {}) {
    return new Column(view, createView(view, object), object.visible || options.visible, object.disabled || options.visible, object.align,
      object.colSpan, object.dataIndex || object.value, object.fixed, object.title || object.text, object.width || object.columnWidth, (object.columns || []).map(it => Column.create(view, it)));
  }
}

export class Table {
  view;
  key;

  @observable borderedExpr;
  @observable showHeaderExpr;
  @observable sizeExpr;
  @observable titleExpr;
  @observable dataSourceExpr;
  @observable allcolumns;

  get type() {
    return 'table';
  }

  @computed get columns() {
    return this.allcolumns.filter(it => it.visible);
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get visible() {
    return this.columns.length>0;
  }
  @computed get bordered() {
    return this.view.execExpr(this.borderedExpr);
  }
  set bordered(borderedExpr) {
    this.borderedExpr = this.view.parseExpr(borderedExpr);
  }
  @computed get showHeader() {
    return this.view.execExpr(this.showHeaderExpr);
  }
  set showHeader(showHeaderExpr) {
    this.showHeaderExpr = this.view.parseExpr(showHeaderExpr);
  }
  @computed get size() {
    return this.view.execExpr(this.sizeExpr);
  }
  set size(sizeExpr) {
    this.sizeExpr = this.view.parseExpr(sizeExpr);
  }
  @computed get title() {
    return this.view.execExpr(this.titleExpr);
  }
  set title(titleExpr) {
    this.titleExpr = this.view.parseExpr(titleExpr);
  }

  @computed get dataSource() {
    return this.view.execExpr(this.dataSourceExpr);
  }
  set dataSource(dataSourceExpr) {
    this.dataSourceExpr = this.view.parseExpr(dataSourceExpr);
  }

  constructor(view, columns = [], dataSourceExpr, borderedExpr = true,
    showHeaderExpr = true, sizeExpr = 'default', titleExpr = null) {
    this.key = assignId();
    this.view = view;

    this.borderedExpr = view.parseExpr(borderedExpr);
    this.showHeaderExpr = view.parseExpr(showHeaderExpr);
    this.sizeExpr = view.parseExpr(sizeExpr);
    this.titleExpr = view.parseExpr(titleExpr);
    this.dataSourceExpr = view.parseExpr(dataSourceExpr);
    this.allcolumns = columns;
  }

  static create(view, object = {}) {
    return new Table(view, (object.columns || []).map(it => Column.create(view, it, object)), object.dataSource || object.value, object.bordered,
      object.showHeader, object.size, object.title);
  }
}
