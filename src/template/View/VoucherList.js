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

export class Tree {
  view;
  key;

  @observable onLoading;
  @observable onLoad;
  @observable onLoaded;

  get type() {
    return 'tree';
  }

  @computed get state() {
    return this.view.state;
  }

  constructor(view, name, onLoading, onLoad, onLoaded) {
    //assert(view);

    this.key = assignId();
    this.view = view;
    this.name = name || 'Tree' + this.key;

    this.onLoading = onLoading;
    this.onLoad = onLoad;
    this.onLoaded = onLoaded;
  }

  static create(view, object = []) {
    let name, onLoading, onLoad, onLoaded;

    name = object.name;
    onLoading = object.onLoading;
    onLoad = object.onLoad;
    onLoaded = object.onLoaded;

    return new Tree(view, name,
      Action.create(view, onLoading), Action.create(view, onLoad), Action.create(view, onLoaded));
  }
}

export class Table {
  view;
  key;

  @observable onLoading;
  @observable onLoad;
  @observable onLoaded;

  get type() {
    return 'table';
  }

  @computed get state() {
    return this.view.state;
  }

  constructor(view, name, onLoading, onLoad, onLoaded) {
    //assert(view);

    this.key = assignId();
    this.view = view;
    this.name = name || 'Table' + this.key;

    this.onLoading = onLoading;
    this.onLoad = onLoad;
    this.onLoaded = onLoaded;
  }

  static create(view, object = []) {
    let name, onLoading, onLoad, onLoaded;

    name = object.name;
    onLoading = object.onLoading;
    onLoad = object.onLoad;
    onLoaded = object.onLoaded;

    return new Table(view, name,
      Action.create(view, onLoading), Action.create(view, onLoad), Action.create(view, onLoaded));
  }
}
