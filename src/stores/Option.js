import {
  observable,
  runInAction,
  action,
} from 'mobx';
import {
  message
} from 'antd';
import {socket,i18n} from 'saas-plat-clientfx';

class Option {
  store;
  inst;

  @observable loading = false;
  @observable loadingText = '';

  get value() {
    return this.inst.viewModel;
  }

  constructor(store, inst) {
    this.store = store;
    this.inst = inst;
  }

  @action showLoading(text = null) {
    this.loadingText = text;
    this.loading = true;
  }

  @action hideLoading() {
    this.loading = false;
  }

  @action async load(query, variables, mapping) {
    this.loadingText = ''; //i18n.t('选项加载中...');
    this.loading = true;
    const data = await socket.query(query, {
      ...variables,
      ...this.inst.options,
      code: this.inst.options.mid, // 选项是唯一的
    });
    const mdata = await mapping(data);
    runInAction(() => {
      this.inst.viewModel.setValue(mdata);
      this.loading = false;
    });
  }

  @action setValue(data) {
    // 修改选项数据
    this.inst.viewModel.setValue(data);
  }

  @action async changeState(state) {
    this.inst.viewModel.setValue({
      state
    });
  }

  @action async save(data, {
    showLoading = true,
    showTip = true,
    hideError = false
  }) {
    if (showLoading) {
      this.loadingText = i18n.t('选项保存中...');
      this.loading = true;
    }
    const result = await socket.command('SaveOption', data);
    await runInAction(async () => {
      if (!result || result.errno > 0) {
        if (showLoading) {
          this.loading = false;
        }
        if (hideError) {
          message.error((result && result.errmsg) || i18n.t('保存失败!'), 1);
        }
        return false;
      }
      if (showLoading) {
        this.loading = false;
      }
      if (showTip) {
        message.success(i18n.t('选项保存成功!'));
      }
    });
    return true;
  }
}

export default class OptionStore {
  @observable items = new Map();

  @action createId({orgid, mid}) {
    return `${orgid}-${mid}`; // 选项是单例的不需要唯一
  }

  @action async create(inst) {
    if (this.items.has(inst.id)) {
      return this.items.get(inst.id);
    }
    const it = new Option(this, inst);
    this.items.set(inst.id, it);
    return it;
  }

  @action async getByCode({
    mid
  }) {
    return {
      id: mid
    };
  }
}
