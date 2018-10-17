import {
  action,
  observable,
  computed,
  runInAction,
  toJS
} from 'mobx';
import {
  message
} from 'antd';
import socket from '../socket';
import log, {
  warn
} from '../log';
import i18n from '../i18n';

class Module {
  store;

  @observable id;
  @observable orgid;
  @observable name;
  @observable type;
  @observable category;
  @observable order;
  @observable visible;
  @observable disabled;
  @observable metaPath;

  @observable error;
  @observable loading;
  @observable loaded;

  view;
  viewModel;
  ruleset;

  // 权限信息
  @observable privileges;
  @observable users = [];
  @observable groups = [];

  @computed get uid() {
    return this.orgid + '/' + this.id;
  }

  @computed get route() {
    return (this.orgid || '~') + ((this.category === 'admin' || this.category === 'manage') ? `/manage/${this.id}` : `/${this.id}`);
  }

  constructor(store, {
    id,
    orgid,
    name,
    category
  }) {
    this.store = store;
    this.id = id;
    this.orgid = orgid;
    this.name = name;
    this.category = category;
  }

  @action load(data) {
    this.name = data.name;
    this.category = data.category;
    this.order = data.order;
    this.visible = data.visible;
    this.disabled = data.disabled;
    this.metaPath = data.metaPath;
    switch (data.type) {
    case 'setting':
    case 'option':
      this.type = 'option';
      break;
    case 'list':
    case 'voucherlist':
      this.type = 'voucherlist';
      break;
    case 'form':
    case 'voucher':
    case 'card':
      this.type = 'voucher';
      break;
    case 'statistics':
    case 'report':
    case 'chart':
      this.type = 'report';
      break;
    default:
      warn('not support module type ' + data.type);
      break;
    }
  }

  @action loadMetadata(view, viewModel, ruleset) {
    this.view = view;
    this.viewModel = viewModel;
    this.ruleset = ruleset;
  }
}

export default class ModuleStore {
  @observable modules = [];
  @observable categories = []; // 模块分类
  @observable openids = [];
  @observable selectid;
  @observable privileges = [];
  @observable loadOrgs = [];

  constructor() {
    // todo 要是当前模块需要提示后关闭
    // 要是没有打开的模块，直接更新
    socket.on('moduleupdate', () => {

    })
  }

  @computed get openedModules() {
    return this.modules.filter(it => this.openids.indexOf(it.uid) > -1);
  }

  @computed get curModule() {
    return this.modules.find(it => it.uid === this.selectid) || this.openedModules[0];
  }

  @computed get moduleCategories() {
    let tms = this.categories.toJS().map(it => {
      const obj = toJS(it);
      obj.modules = this.modules.filter(m => m.category === it.id);
      return obj;
    });
    const tids = this.categories.map(it => it.id);
    tms.push({
      id: 'nomoduleCategories',
      name: i18n.t('其他'),
      modules: this.modules.filter(m => tids.indexOf(m.category) === -1)
    });
    // 由小到大排序
    tms = tms.sort((t1, t2) => t1.order - t2.order);
    return tms;
  }

  @action async loadConfig(orgid, mid) {
    const module = this.modules.find(it => it.id === mid && it.orgid === orgid);
    if (!module) {
      warn('module not exists');
      return;
    }
    if (module.loaded) {
      return module;
    }
    module.loading = true;
    try {
      const info = await socket.get('module/' + mid);
      await runInAction(async () => {
        module.load(info);
        const {
          view,
          model,
          viewModel,
          rules
        } = await socket.get('ruleset/' + module.metaPath, {
          type: 'client'
        });
        runInAction(() => {
          module.loadMetadata(view, viewModel || model, rules);
          module.loaded = true;
          module.loading = false;
        });
      });
    } catch (err) {
      message.error(i18n.t('模块打开失败!'));
      runInAction(async () => {
        module.error = err.message;
        module.loading = false;
      });
    }
    return module;
  }

  @action closeAll() {
    this.selectid = null;
    this.openids.length = 0;
  }

  @action changeModule(module) {
    if (!module) {
      this.selectid = null;
    } else {
      this.selectid = `${module.orgid}/${module.mid}`;
    }
  }

  @action openModule(orgid, mid) {
    const module = this.modules.find(it => it.id === mid && it.orgid === orgid);
    if (!module) {
      log(mid, 'module not exists');
      return;
    }
    if (this.openids.indexOf(module.uid) === -1) {
      this.openids.push(module.uid);
    }
    this.changeModule({
      orgid,
      mid
    });
  }

  @action async loadOrgModules(orgid) {
    if (this.loadOrgs.indexOf(orgid) > -1) {
      return;
    }
    const modules = await socket.get('module', {
      orgid
    }) || [];
    const categories = await socket.get('moduleCategory', {
      orgid
    }) || [];
    runInAction(() => {
      this.modules = this.modules.concat(modules.map(it => new Module(this, it)));
      this.categories = categories;
      this.loadOrgs.push(orgid);
    });
  }

  @action clearModules() {
    this.modules.length = 0;
  }
}
