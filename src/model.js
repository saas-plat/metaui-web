import {
  observable,
  action,
  toJS
} from "mobx";
import _get from 'lodash/get';
import _set from 'lodash/get';
import _has from 'lodash/get';
import _mergeWith from 'lodash/mergeWith';

export default class Model {

  @observable data;

  get(keyPath, defaultValue) {
    return _get(this.data, keyPath, defaultValue);
  }

  has(keyPath) {
    return _has(this.data, keyPath);
  }

  @action set(keyPath, value = {}) {
    _set(this.data, keyPath, value);
  }

  @action mergeValue(value) {
    _mergeWith(this.data, value, (obj, src) => {
      return src; // todo 没有的字段需要 extendObservable
    });
  }

  constructor(data) {
    this.data = data;
  }

  toJS() {
    return toJS(this.data);
  }

  static create(data) {
    return new Model(data);
  }
}
