import {
  action,
  observable,
  autorun
} from 'mobx';

import {
  message
} from 'antd';
// 这里的actions是view可以配置的action
import {
  controller,i18n,log,RuleSet
} from 'saas-plat-clientfx';
const {
  warn
} = log;

import View from './View';
import ViewModel from './Model';

class Event {
  @observable name;
  @observable args;

  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

class Instance {
  store;

  id;
  config;
  @observable options;

  @observable error;

  @observable view;
  @observable viewModel;
  @observable ruleset;

  constructor(store, id, config, view, viewModel, ruleset, options = {}) {
    this.store = store;
    this.id = id;
    this.config = config;
    this.view = view;
    this.viewModel = viewModel;
    this.ruleset = ruleset;
    this.options = options;
  }
}

const bindContext = (actions, ctx) => {
  return Object.keys(actions).reduce((obj,key)=>{
    obj[key] = actions[key].bind(null, ctx);
    return obj;
  },{});
}

class TemplateEngine {
  @observable instances = new Map();

  findInstance({
    orgid,
    mid,
    code
  }) {
    const items = this.instances.values();
    for (let it of items) {
      if (it.options.code === code && it.options.orgid === orgid && it.options.mid === mid) {
        return it;
      }
    }
    return null;
  }

  @action async create(config, id, options = {}) {
    if (this.instances.has(id)) {
      return this.instances.get(id);
    }
    const viewModel = ViewModel.create(this, config.viewModel);
    // 记录当前id
    viewModel.setValue({id});
    // 需要把vm传进去支持view表达式系统
    const view = View.create(config.view, viewModel);
    const ctx = { ...options,
      id,
      view,
      viewModel
    };
    const ruleset = new RuleSet(config.ruleset, {
      View: View,
      ViewModel: ViewModel,
      Event: Event
    }, {
      ...bindContext(controller.default, ctx),
      ...ctx
    });
    const inst = new Instance(this, id, config, view, viewModel, ruleset, options);
    this.instances.set(id, inst);
    // 执行规则计算
    inst.whenDisposer = autorun(
      () => this.executeRule(ruleset, null, {
        view,
        viewModel
      })
    );
    await this.executeRule(ruleset, {
      name: 'view.init'
    }, {
      view,
      viewModel
    });
    return inst;
  }

  @action async executeRule(ruleset, event, facts = {}) {
    const {
      view,
      viewModel
    } = facts;
    const eventObj = event && new Event(event.name, event.args);
    // 必须加载完界面元数据
    if (ruleset) {
      if (eventObj) {
        log('execute rule', event);
        await ruleset.execute([view, viewModel, eventObj]);
        log('execute rule complated', event);
      } else {
        log('execute', 'state.change');
        await ruleset.execute([view, viewModel]);
        log('execute complated', 'state.change');
      }
    }
  }

  @action async executeAction(items, args = {}, context = {}) {
    if (!items) {
      return;
    }
    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        await this.executeAction(items[i], args, context);
      }
    } else {
      const params = args;
      // 这里执行行为
      let actionObj;
      let action = items;
      if (typeof action === 'string') {
        actionObj = {
          ...params,
          name: action
        }
      } else {
        if (!action.name) {
          warn('action name not exists, can not execute');
          return;
        }
        actionObj = {
          ...action.toJS().args,
          ...params,
          name: action.name
        };
      }
      const {
        name,
        ...other
      } = actionObj;
      const handler = actions[name];
      if (!handler || typeof handler !== 'function') {
        warn(name + ' action is not exists or can not execute');
        message.info(i18n.t('执行失败'), 2, null, false);
        return;
      }
      //try {
      log('execute action', name);
      await handler(context, other);
      log('execute action computed', name);
      // } catch (err) {
      //   warn(err);
      // }
    }
  }

  @action when(id, key, evtName, actionHandler, args) {
    const formatEvent = evtName[0].toUpperCase() + evtName.substr(1),
      eventName = key + '.' + evtName,
      beforeEvent = key + '.before' + formatEvent,
      afterEvent = key + '.after' + formatEvent,
      onevent = eventName;
    return this.execute(id, {
      beforeEvent,
      event: onevent,
      afterEvent
    }, {
      action: actionHandler
    }, args);
  }

  @action trigger(id, target, event, args) {
    const key = target.name,
      evtName = event,
      formatEvent = evtName[0].toUpperCase() + evtName.substr(1),
      eventName = key + '.' + evtName,
      beforeEvent = key + '.before' + formatEvent,
      afterEvent = key + '.after' + formatEvent,
      onevent = eventName,
      beforeAction = target['onBefore' + formatEvent],
      action = target['on' + formatEvent], // 这里的target.get获取的都是表达式计算后的值
      afterAction = target['onAfter' + formatEvent];
    if (!key) {
      warn('target key not exists, skip handle event.');
      return;
    }
    log('trigger', key, evtName);
    this.execute(id, {
      beforeEvent,
      event: onevent,
      afterEvent
    }, {
      beforeAction,
      action,
      afterAction
    }, {
      target,
      ...args
    });
  }

  @action execute(id, targetEvent = {}, defaultAction = {}, args = {}) {
    const {
      view,
      viewModel,
      ruleset,
      options
    } = this.instances.get(id);
    const context = {
      ...options,
      id,
      view,
      viewModel
    };
    const tasks = [];
    typeof defaultAction.beforeAction === 'object' ?
      tasks.push(this.executeAction(defaultAction.beforeAction, args, context)) :
      typeof defaultAction.beforeAction === 'function' ?
      tasks.push(defaultAction.beforeAction(args, context)) :
      null;
    tasks.push(this.executeRule(ruleset, {
      name: targetEvent.beforeEvent,
      args
    }, context));
    typeof defaultAction.action === 'object' ?
      tasks.push(this.executeAction(defaultAction.action, args, context)) :
      typeof defaultAction.beforeAction === 'function' ?
      tasks.push(defaultAction.action(args, context)) :
      null;
    tasks.push(this.executeRule(ruleset, {
      name: targetEvent.event,
      args
    }, context));
    typeof defaultAction.afterAction === 'object' ?
      tasks.push(this.executeAction(defaultAction.afterAction, args, context)) :
      typeof defaultAction.beforeAction === 'function' ?
      tasks.push(defaultAction.afterAction(args, context)) :
      null;
    tasks.push(this.executeRule(ruleset, {
      name: targetEvent.afterEvent,
      args
    }, context));
    // todo: tasks是否需要改成执行队列，保证多个事件按照顺序执行??
    Promise.all(tasks).catch(err => {
      warn(err);
    });
  }
}

export default new TemplateEngine();
