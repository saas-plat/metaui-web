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
import {
  Table
} from './Table';
import _get from 'lodash/get';

export class Input {
  store;
  key;

  @observable name;
  @observable typeExpr;
  @observable placeholderExpr;
  @observable clearExpr;
  @observable visibleExpr;
  @observable disabledExpr;
  @observable maxLengthExpr;
  @observable sizeExpr;
  @observable widthExpr;
  @observable defaultValueExpr;
  @observable formatExpr;
  @observable errorExpr;
  @observable extraExpr;

  @observable minExpr;
  @observable maxExpr;

  // 取值表达式
  @observable getValueExpr;
  // 赋值映射
  @observable mappingExpr;
  // 指定赋值表达式
  @observable setValueExpr;

  @observable onBeforeChange;
  @observable onChange;
  @observable onAfterChange;
  @observable onBeforeBlur;
  @observable onBlur;
  @observable onAfterBlur;
  @observable onBeforeFocus;
  @observable onFocus;
  @observable onAfterFocus;
  @observable onBeforeErrorClick;
  @observable onErrorClick;
  @observable onAfterErrorClick;
  @observable onBeforeExtraClick;
  @observable onExtraClick;
  @observable onAfterExtraClick;

  @computed get state() {
    return this.store.state;
  }

  @computed get type() {
    return this.store.execExpr(this.typeExpr);
  }
  set type(typeExpr) {
    this.typeExpr = this.store.parseExpr(typeExpr);
  }
  @computed get placeholder() {
    return this.store.execExpr(this.placeholderExpr);
  }
  set placeholder(placeholderExpr) {
    this.placeholderExpr = this.store.parseExpr(placeholderExpr);
  }
  @computed get clear() {
    return this.store.execExpr(this.clearExpr);
  }
  set clear(clearExpr) {
    this.clearExpr = this.store.parseExpr(clearExpr);
  }

  @computed get visible() {
    return this.store.execExpr(this.visibleExpr);
  }
  set visible(visibleExpr) {
    this.visibleExpr = this.store.parseExpr(visibleExpr);
  }
  @computed get disabled() {
    return this.store.execExpr(this.disabledExpr);
  }
  set disabled(disabledExpr) {
    this.disabledExpr = this.store.parseExpr(disabledExpr);
  }
  @computed get size() {
    return this.store.execExpr(this.sizeExpr);
  }
  set size(sizeExpr) {
    this.sizeExpr = this.store.parseExpr(sizeExpr);
  }
  @computed get maxLength() {
    return this.store.execExpr(this.maxLengthExpr);
  }
  set maxLength(maxLengthExpr) {
    this.maxLengthExpr = this.store.parseExpr(maxLengthExpr);
  }
  @computed get width() {
    return this.store.execExpr(this.widthExpr);
  }
  set width(widthExpr) {
    this.widthExpr = this.store.parseExpr(widthExpr);
  }

  @computed get defaultValue() {
    return this.store.execExpr(this.defaultValueExpr);
  }
  set defaultValue(defaultValueExpr) {
    this.defaultValueExpr = this.store.parseExpr(defaultValueExpr);
  }
  @computed get getValue() {
    return this.store.execExpr(this.getValueExpr);
  }
  set getValue(getValueExpr) {
    this.getValueExpr = this.store.parseExpr(getValueExpr);
  }
  @computed get value() {
    return _get(this.store.model,this.getValue);
  }
  @computed get setValue() {
    return this.store.execExpr(this.setValueExpr);
  }
  set setValue(setValueExpr) {
    this.setValueExpr = this.store.parseExpr(setValueExpr);
  }
  @computed get mapping() {
    return this.store.execExpr(this.mappingExpr);
  }
  set mapping(mappingExpr) {
    this.mappingExpr = this.store.parseExpr(mappingExpr);
  }
  @computed get format() {
    return this.store.execExpr(this.formatExpr);
  }
  set format(formatExpr) {
    this.formatExpr = this.store.parseExpr(formatExpr);
  }
  @computed get error() {
    return this.store.execExpr(this.errorExpr);
  }
  set error(errorExpr) {
    this.errorExpr = this.store.parseExpr(errorExpr);
  }
  @computed get extra() {
    return this.store.execExpr(this.extraExpr);
  }
  set extra(extraExpr) {
    this.extraExpr = this.store.parseExpr(extraExpr);
  }

  @computed get min() {
    return this.store.execExpr(this.minExpr);
  }
  set min(minExpr) {
    this.minExpr = this.store.parseExpr(minExpr);
  }
  @computed get max() {
    return this.store.execExpr(this.maxExpr);
  }
  set max(maxExpr) {
    this.maxExpr = this.store.parseExpr(maxExpr);
  }

  toString() {
    return this.type + ':' + this.name;
  }

  constructor(store, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, getValueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick) {

    this.key = assignId('Input');
    this.store = store;
    this.name = name || this.key;

    this.typeExpr = store.parseExpr(typeExpr);
    this.placeholderExpr = store.parseExpr(placeholderExpr);
    this.clearExpr = store.parseExpr(clearExpr);
    this.disabledExpr = store.parseExpr(disabledExpr);
    this.visibleExpr = store.parseExpr(visibleExpr);
    this.sizeExpr = store.parseExpr(sizeExpr);
    this.maxLengthExpr = store.parseExpr(maxLengthExpr);
    this.widthExpr = store.parseExpr(widthExpr);
    this.defaultValueExpr = store.parseExpr(defaultValueExpr);
    this.getValueExpr = store.parseExpr(getValueExpr);
    this.setValueExpr = store.parseExpr(setValueExpr);
    this.mappingExpr = store.parseExpr(mappingExpr);
    this.formatExpr = store.parseExpr(formatExpr);
    this.errorExpr = store.parseExpr(errorExpr);
    this.extraExpr = store.parseExpr(extraExpr);
    this.minExpr = store.parseExpr(minExpr);
    this.maxExpr = store.parseExpr(maxExpr);

    this.onBeforeChange = onBeforeChange;
    // 默认赋值功能
    this.onChange = onChange;  //  || Action.create(store, 'setValue') 
    this.onAfterChange = onAfterChange;
    this.onBeforeBlur = onBeforeBlur;
    this.onBlur = onBlur;
    this.onAfterBlur = onAfterBlur;
    this.onBeforeFocus = onBeforeFocus;
    this.onFocus = onFocus;
    this.onAfterFocus = onAfterFocus;
    this.onBeforeErrorClick = onBeforeErrorClick;
    this.onErrorClick = onErrorClick;
    this.onAfterErrorClick = onAfterErrorClick;
    this.onBeforeExtraClick = onBeforeExtraClick;
    this.onExtraClick = onExtraClick;
    this.onAfterExtraClick = onAfterExtraClick;
  }

  static create(store, object) {
    if (object.type === 'money') {
      object.type = 'number';
      object.format = object.format || 'thousandth';
    }
    if (object.type === 'refselect') {
      return new RefInput(store, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue || object.value, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(store, object.onChanging),
        Action.create(store, object.onChange), Action.create(store, object.onChanged), Action.create(store, object.onBluring),
        Action.create(store, object.onBlur), Action.create(store, object.onBlured), Action.create(store, object.onFocusing),
        Action.create(store, object.onFocus), Action.create(store, object.onFocused), Action.create(store, object.onErrorClicking),
        Action.create(store, object.onErrorClick), Action.create(store, object.onErrorClicked),
        Action.create(store, object.onExtraClicking), Action.create(store, object.onExtraClick),
        Action.create(store, object.onExtraClicked),
        object.dropdownStyle);
    } else if (object.type === 'inputtable' || object.type === 'table') {
      return new InputTable(store, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue || object.value, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(store, object.onChanging),
        Action.create(store, object.onChange), Action.create(store, object.onChanged), Action.create(store, object.onBluring),
        Action.create(store, object.onBlur), Action.create(store, object.onBlured), Action.create(store, object.onFocusing),
        Action.create(store, object.onFocus), Action.create(store, object.onFocused), Action.create(store, object.onErrorClicking),
        Action.create(store, object.onErrorClick), Action.create(store, object.onErrorClicked),
        Action.create(store, object.onExtraClicking), Action.create(store, object.onExtraClick),
        Action.create(store, object.onExtraClicked),
        Table.create(store, object.table));
    } else {
      if (!object.format) {
        switch (object.type) {
        case 'date':
        case 'daterange':
          object.format = "YYYY-MM-DD";
          break;
        case 'datetime':
          object.format = "YYYY-MM-DD HH:mm:ss";
          break;
        case 'time':
          object.format = "HH:mm:ss";
          break;
        case 'week':
          object.format = "YYYY-wo";
          break;
        case 'month':
          object.format = "YYYY-MM";
          break;
        }
      }
      return new Input(store, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue || object.value, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(store, object.onChanging),
        Action.create(store, object.onChange), Action.create(store, object.onChanged), Action.create(store, object.onBluring),
        Action.create(store, object.onBlur), Action.create(store, object.onBlured), Action.create(store, object.onFocusing),
        Action.create(store, object.onFocus), Action.create(store, object.onFocused), Action.create(store, object.onErrorClicking),
        Action.create(store, object.onErrorClick), Action.create(store, object.onErrorClicked),
        Action.create(store, object.onExtraClicking), Action.create(store, object.onExtraClick),
        Action.create(store, object.onExtraClicked));
    }
  }
}

export class InputTable extends Input {
  @observable table;

  constructor(store, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, getValueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick,
    table) {
    super(store, name, typeExpr, placeholderExpr, clearExpr, visibleExpr, disabledExpr, sizeExpr,
      maxLengthExpr, widthExpr, defaultValueExpr, getValueExpr, setValueExpr, mappingExpr, formatExpr, errorExpr, extraExpr, minExpr, maxExpr,
      onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
      onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick);

    this.table = table;
  }
}

export class RefInput extends Input {
  constructor(store, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, getValueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick) {
    super(store, name, typeExpr, placeholderExpr, clearExpr, visibleExpr, disabledExpr, sizeExpr,
      maxLengthExpr, widthExpr, defaultValueExpr, getValueExpr, setValueExpr, mappingExpr, formatExpr, errorExpr, extraExpr, minExpr, maxExpr,
      onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
      onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick)
  }
}
