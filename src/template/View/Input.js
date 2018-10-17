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


export class Input {
  view;
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
  @observable valueExpr;
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
    return this.view.state;
  }

  @computed get type() {
    return this.view.execExpr(this.typeExpr);
  }
  set type(typeExpr) {
    this.typeExpr = this.view.parseExpr(typeExpr);
  }
  @computed get placeholder() {
    return this.view.execExpr(this.placeholderExpr);
  }
  set placeholder(placeholderExpr) {
    this.placeholderExpr = this.view.parseExpr(placeholderExpr);
  }
  @computed get clear() {
    return this.view.execExpr(this.clearExpr);
  }
  set clear(clearExpr) {
    this.clearExpr = this.view.parseExpr(clearExpr);
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
  @computed get size() {
    return this.view.execExpr(this.sizeExpr);
  }
  set size(sizeExpr) {
    this.sizeExpr = this.view.parseExpr(sizeExpr);
  }
  @computed get maxLength() {
    return this.view.execExpr(this.maxLengthExpr);
  }
  set maxLength(maxLengthExpr) {
    this.maxLengthExpr = this.view.parseExpr(maxLengthExpr);
  }
  @computed get width() {
    return this.view.execExpr(this.widthExpr);
  }
  set width(widthExpr) {
    this.widthExpr = this.view.parseExpr(widthExpr);
  }

  @computed get defaultValue() {
    return this.view.execExpr(this.defaultValueExpr);
  }
  set defaultValue(defaultValueExpr) {
    this.defaultValueExpr = this.view.parseExpr(defaultValueExpr);
  }
  @computed get value() {
    return this.view.execExpr(this.valueExpr);
  }
  set value(valueExpr) {
    this.valueExpr = this.view.parseExpr(valueExpr);
  }
  @computed get setValue() {
    return this.view.execExpr(this.setValueExpr);
  }
  set setValue(setValueExpr) {
    this.setValueExpr = this.view.parseExpr(setValueExpr);
  }
  @computed get mapping() {
    return this.view.execExpr(this.mappingExpr);
  }
  set mapping(mappingExpr) {
    this.mappingExpr = this.view.parseExpr(mappingExpr);
  }
  @computed get format() {
    return this.view.execExpr(this.formatExpr);
  }
  set format(formatExpr) {
    this.formatExpr = this.view.parseExpr(formatExpr);
  }
  @computed get error() {
    return this.view.execExpr(this.errorExpr);
  }
  set error(errorExpr) {
    this.errorExpr = this.view.parseExpr(errorExpr);
  }
  @computed get extra() {
    return this.view.execExpr(this.extraExpr);
  }
  set extra(extraExpr) {
    this.extraExpr = this.view.parseExpr(extraExpr);
  }

  @computed get min() {
    return this.view.execExpr(this.minExpr);
  }
  set min(minExpr) {
    this.minExpr = this.view.parseExpr(minExpr);
  }
  @computed get max() {
    return this.view.execExpr(this.maxExpr);
  }
  set max(maxExpr) {
    this.maxExpr = this.view.parseExpr(maxExpr);
  }

  toString(){
    return this.type + ':' + this.name;
  }

  constructor(view, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, valueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick) {

    this.key = assignId('Input');
    this.view = view;
    this.name = name || this.key;

    this.typeExpr = view.parseExpr(typeExpr);
    this.placeholderExpr = view.parseExpr(placeholderExpr);
    this.clearExpr = view.parseExpr(clearExpr);
    this.disabledExpr = view.parseExpr(disabledExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.sizeExpr = view.parseExpr(sizeExpr);
    this.maxLengthExpr = view.parseExpr(maxLengthExpr);
    this.widthExpr = view.parseExpr(widthExpr);
    this.defaultValueExpr = view.parseExpr(defaultValueExpr);
    this.valueExpr = view.parseExpr(valueExpr);
    this.setValueExpr = view.parseExpr(setValueExpr);
    this.mappingExpr = view.parseExpr(mappingExpr);
    this.formatExpr = view.parseExpr(formatExpr);
    this.errorExpr = view.parseExpr(errorExpr);
    this.extraExpr = view.parseExpr(extraExpr);
    this.minExpr = view.parseExpr(minExpr);
    this.maxExpr = view.parseExpr(maxExpr);

    this.onBeforeChange = onBeforeChange;
    // 默认赋值功能
    this.onChange = onChange || Action.create(view, 'setValue');
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

  static create(view, object) {
    if (object.type === 'money') {
      object.type = 'number';
      object.format = object.format || 'thousandth';
    }
    if (object.type === 'refselect') {
      return new RefInput(view, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(view, object.onChanging),
        Action.create(view, object.onChange), Action.create(view, object.onChanged), Action.create(view, object.onBluring),
        Action.create(view, object.onBlur), Action.create(view, object.onBlured), Action.create(view, object.onFocusing),
        Action.create(view, object.onFocus), Action.create(view, object.onFocused), Action.create(view, object.onErrorClicking),
        Action.create(view, object.onErrorClick), Action.create(view, object.onErrorClicked),
        Action.create(view, object.onExtraClicking), Action.create(view, object.onExtraClick),
        Action.create(view, object.onExtraClicked),
        object.dropdownStyle);
    } else if (object.type === 'inputtable' || object.type === 'table') {
      return new InputTable(view, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(view, object.onChanging),
        Action.create(view, object.onChange), Action.create(view, object.onChanged), Action.create(view, object.onBluring),
        Action.create(view, object.onBlur), Action.create(view, object.onBlured), Action.create(view, object.onFocusing),
        Action.create(view, object.onFocus), Action.create(view, object.onFocused), Action.create(view, object.onErrorClicking),
        Action.create(view, object.onErrorClick), Action.create(view, object.onErrorClicked),
        Action.create(view, object.onExtraClicking), Action.create(view, object.onExtraClick),
        Action.create(view, object.onExtraClicked),
        Table.create(view, object.table));
    } else {
      return new Input(view, object.name, object.type, object.placeholder, object.clear,
        object.visible, object.disabled, object.size, object.maxLength, object.width, object.defaultValue, object.value, object.setValue, object.mapping,
        object.format, object.error, object.extra, object.min, object.max, Action.create(view, object.onChanging),
        Action.create(view, object.onChange), Action.create(view, object.onChanged), Action.create(view, object.onBluring),
        Action.create(view, object.onBlur), Action.create(view, object.onBlured), Action.create(view, object.onFocusing),
        Action.create(view, object.onFocus), Action.create(view, object.onFocused), Action.create(view, object.onErrorClicking),
        Action.create(view, object.onErrorClick), Action.create(view, object.onErrorClicked),
        Action.create(view, object.onExtraClicking), Action.create(view, object.onExtraClick),
        Action.create(view, object.onExtraClicked));
    }
  }
}

export class InputTable extends Input {
  @observable table;

  constructor(view, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, valueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick,
    table) {
    super(view, name, typeExpr, placeholderExpr, clearExpr, visibleExpr, disabledExpr, sizeExpr,
      maxLengthExpr, widthExpr, defaultValueExpr, valueExpr, setValueExpr, mappingExpr, formatExpr, errorExpr, extraExpr, minExpr, maxExpr,
      onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
      onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick);

    this.table = table;
  }
}

export class RefInput extends Input {
  constructor(view, name, typeExpr = 'text', placeholderExpr, clearExpr = false, visibleExpr = true, disabledExpr = false, sizeExpr = 'default',
    maxLengthExpr, widthExpr, defaultValueExpr, valueExpr, setValueExpr, mappingExpr, formatExpr = '', errorExpr = true, extraExpr, minExpr = -Infinity, maxExpr = Infinity,
    onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
    onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick) {
    super(view, name, typeExpr, placeholderExpr, clearExpr, visibleExpr, disabledExpr, sizeExpr,
      maxLengthExpr, widthExpr, defaultValueExpr, valueExpr, setValueExpr, mappingExpr, formatExpr, errorExpr, extraExpr, minExpr, maxExpr,
      onBeforeChange, onChange, onAfterChange, onBeforeBlur, onBlur, onAfterBlur, onBeforeFocus, onFocus, onAfterFocus, onBeforeErrorClick,
      onErrorClick, onAfterErrorClick, onBeforeExtraClick, onExtraClick, onAfterExtraClick)
  }
}
