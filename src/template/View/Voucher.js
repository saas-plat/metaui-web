import {
  observable,
  computed
} from "mobx";
import {
  assignId,
  createView
} from './util';
import {
  Action
} from './Action';

const ItemDefaultWidth = 360;

class Rule {
  view;
  key;

  // string: Must be of type string. This is the default type.
  // number: Must be of type number.
  // boolean: Must be of type boolean.
  // method: Must be of type function.
  // regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
  // integer: Must be of type number and an integer.
  // float: Must be of type number and a floating point number.
  // array: Must be an array as determined by Array.isArray.
  // object: Must be of type object and not Array.isArray.
  // enum: Value must exist in the enum.
  // date: Value must be valid as determined by Date
  // url: Must be of type url.
  // hex: Must be of type hex.
  // email: Must be of type email.
  @observable typeExpr;
  @observable requiredExpr;
  @observable messageExpr;
  @observable enumExpr;
  @observable lenExpr;
  @observable patternExpr;
  @observable whitespaceExpr;
  @observable fieldsExpr;
  @observable defaultFieldExpr;

  constructor(view, typeExpr, requiredExpr, messageExpr, enumExpr, lenExpr, patternExpr, whitespaceExpr, fieldsExpr, defaultFieldExpr) {
    this.key = assignId('Rule');
    this.view = view;

    this.typeExpr = view.parseExpr(typeExpr);
    this.requiredExpr = view.parseExpr(requiredExpr);
    this.messageExpr = view.parseExpr(messageExpr);
    this.enumExpr = view.parseExpr(enumExpr);
    this.lenExpr = view.parseExpr(lenExpr);
    this.patternExpr = view.parseExpr(patternExpr);
    this.whitespaceExpr = view.parseExpr(whitespaceExpr);
    this.fieldsExpr = view.parseExpr(fieldsExpr);
    this.defaultFieldExpr = view.parseExpr(defaultFieldExpr);
  }

  static create(view, obj) {
    return new Layout(view, obj.type, obj.required, obj.message, obj.enum, obj.len, obj.pattern, obj.whitespace, obj.fields, obj.defaultField);
  }

  toJS() {
    return {
      type: this.view.execExpr(this.typeExpr),
      required: this.view.execExpr(this.requiredExpr),
      message: this.view.execExpr(this.messageExpr),
      enum: this.view.execExpr(this.enumExpr),
      len: this.view.execExpr(this.lenExpr),
      pattern: this.view.execExpr(this.patternExpr),
      whitespace: this.view.execExpr(this.whitespaceExpr),
      fields: this.view.execExpr(this.fieldsExpr),
      defaultField: this.view.execExpr(this.defaultFieldExpr),
    }
  }
}

class FormItem {
  view;
  key;

  @observable labelSpanExpr;
  @observable labelTextExpr;
  @observable formItem;
  @observable widthExpr; // flowlayout每项宽度

  @observable rules;

  get type() {
    return 'formItem';
  }

  @computed get width() {
    const v = this.view.execExpr(this.widthExpr);
    if (v.indexOf('%') > -1) {
      return v;
    }
    const vv = parseFloat(v);
    return vv !== 0 ? (vv || ItemDefaultWidth) : vv;
  }

  @computed get visible() {
    return this.formItem.visible;
  }
  set visible(visibleExpr) {
    this.formItem.visible = visibleExpr;
  }
  @computed get disabled() {
    return this.formItem.disabled;
  }
  set disabled(disabledExpr) {
    this.formItem.disabled = disabledExpr;
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get labelSpan() {
    const span = parseInt(this.view.execExpr(this.labelSpanExpr));
    return span !== 0 ? ((span || 4) % 24) : span;
  }

  @computed get labelText() {
    return this.view.execExpr(this.labelTextExpr);
  }

  constructor(view, labelSpanExpr = 6, labelTextExpr = '', widthExpr = '', formItem, rules = []) {
    this.key = assignId('FormItem');
    this.view = view;
    this.labelSpanExpr = view.parseExpr(labelSpanExpr);
    this.labelTextExpr = view.parseExpr(labelTextExpr);

    this.widthExpr = view.parseExpr(widthExpr);

    this.formItem = formItem;
    this.rules = rules;
  }

  static create(view, obj, options) {
    let labelSpan = obj.labelSpan || options.labelSpan;
    let labelText = obj.labelText || obj.label || obj.text;
    if (!labelSpan && !labelText) {
      labelSpan = 0;
    }
    // formitem 和 inputitem 合并一起配置
    return new FormItem(view, labelSpan, labelText, obj.width || options.itemWidth, createView(view, obj), (obj.rules || []).map(it => Rule.create(view, it)));
  }
}

export class Layout {
  view;
  key;

  @observable name;
  @observable type; // flowlayout   gridlayout
  @observable columnCountExpr; // gridlayout时列数
  @observable itemWidthExpr; // flowlayout每项宽度

  @observable items;

  @computed get state() {
    return this.view.state;
  }

  @computed get itemWidth() {
    return parseFloat(this.view.execExpr(this.itemWidthExpr)) || ItemDefaultWidth;
  }

  @computed get columnCount() {
    const count = parseInt(this.view.execExpr(this.columnCountExpr));
    return count !== 0 ? (count || 4) : count;
  }

  constructor(view, name, type = 'flow', columnCountExpr = 4, itemWidthExpr = ItemDefaultWidth, items = []) {
    this.key = assignId('Layout');
    this.view = view;
    this.name = name || this.key;
    this.type = type;

    this.columnCountExpr = view.parseExpr(columnCountExpr);
    this.itemWidthExpr = view.parseExpr(itemWidthExpr);

    this.items = items;
  }

  static create(view, obj, options) {
    return new Layout(view, obj.name, obj.type, obj.columnCount, obj.itemWidth, (obj.items || []).map(it => FormItem.create(view, it, {
      itemWidth: obj.itemWidth,
      ...options
    })));
  }
}

export class Tab {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;
  @observable panel;

  get type() {
    return 'tab';
  }

  @computed get state() {
    return this.view.state;
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

  constructor(view, name, text, icon, disableExpr = false, visibleExpr = true, panel) {
    this.key = assignId('Tab');
    this.view = view;
    this.name = name || this.key;
    this.textExpr = this.view.parseExpr(text);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.panel = panel;
  }

  static create(view, obj, options) {
    let tab;
    if (obj.panel || obj.type === 'tab') {
      tab = obj;
    } else {
      tab = {
        panel: obj
      };
    }
    return new Tab(view, obj.name, obj.text, obj.icon, obj.disable, obj.visible, Layout.create(view, tab.panel, options));
  }

}

export class Group {
  view;
  key;

  @observable name;
  @observable textExpr;
  @observable iconExpr;
  @observable disableExpr;
  @observable visibleExpr;

  @observable tabs;

  get type() {
    return 'group';
  }

  @computed get state() {
    return this.view.state;
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

  constructor(view, name, text, icon, disableExpr = false, visibleExpr = true, tabs = []) {
    this.key = assignId('Group');
    this.view = view;
    this.name = name || this.key;
    this.textExpr = this.view.parseExpr(text);
    this.iconExpr = this.view.parseExpr(icon);
    this.disableExpr = view.parseExpr(disableExpr);
    this.visibleExpr = view.parseExpr(visibleExpr);
    this.tabs = tabs;
  }

  static create(view, obj, options) {
    let tabs = [];
    if (obj.type === 'tabs') {
      tabs = obj.items;
    } else {
      tabs.push({
        text: '',
        panel: obj
      });
    }
    return new Group(view, obj.name, obj.title || obj.text, obj.icon, obj.disable, obj.visible, tabs.map(it => Tab.create(view, it, options)));
  }
}

export class CardForm {
  view;
  key;

  @observable name;
  @observable groups;

  @observable labelSpanExpr;

  @observable onBeforeChange;
  @observable onChange;
  @observable onAfterChange;

  get type() {
    return 'cardform';
  }

  @computed get state() {
    return this.view.state;
  }

  @computed get labelSpan() {
    // 24列布局
    const span = parseInt(this.view.execExpr(this.labelSpanExpr));
    return span !== 0 ? ((span || 4) % 24) : span;
  }

  constructor(view, name, labelSpanExpr = 4, groups = [], onBeforeChange, onChange, onAfterChange) {
    //assert(view);

    this.key = assignId('CardForm');
    this.view = view;
    this.name = name || this.key;
    this.groups = groups;
    this.labelSpanExpr = view.parseExpr(labelSpanExpr);

    this.onBeforeChange = onBeforeChange;
    this.onChange = onChange;
    this.onAfterChange = onAfterChange;
  }

  static create(view, object = []) {
    let groups, name, labelSpan,
    onChanging,onChange,onChanged;

    if (Array.isArray(object)) {
      groups = object;
    } else if (object.groups) {
      groups = object.groups;
      name = object.name;
      labelSpan = object.labelSpan;
      onChanging=object.onChanging;
      onChange=object.onChange;
      onChanged=object.onChanged;
    } else {
      groups = [object];
    }
    if (!Array.isArray(groups)) {
      groups = [groups];
    }
    return new CardForm(view, name, labelSpan, groups.map(it => Group.create(view, it, {
        labelSpan
      })),
      Action.create(view, onChanging), Action.create(view, onChange), Action.create(view, onChanged));
  }
}
