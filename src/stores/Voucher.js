import {
  observable,
  runInAction,
  action,
} from 'mobx';
import {
  message
} from 'antd';
import {socket,i18n,history} from 'saas-plat-clientfx';

class Voucher {
  store;
  inst;

  @observable optionVisible;
  @observable optionSaving;

  get value() {
    return this.inst.viewModel;
  }

  constructor(store, inst) {
    this.store = store;
    this.inst = inst;
  }

  @action showOptions(visible = true) {
    this.optionVisible = visible;
  }

  @action async saveOptions() {
    this.loading = true;
    setTimeout(() => {
      runInAction(() => {
        this.loading = false;
        this.optionVisible = false;
      })
    }, 1000);
  }

  @action async create() {
    const {
      orgid,
      mid
    } = this.inst.options;
    const data = await socket.get('voucher/create', {
      orgid,
      mid
    });
    runInAction(() => {
      this.inst.viewModel.setValue({
        ...data,
        state: 'NEW'
      });
      if (data.code !== undefined) {
        this.inst.options.code = data.code;
      }
    });
  }

  @action async changeState(state) {
    this.inst.viewModel.setValue({
      state
    });
  }

  @action async load(query, variables, mapping) {
    const data = await socket.query(query, {
      ...variables,
      ...this.inst.options,
    });
    const mdata = await mapping(data);
    runInAction(() => {
      this.inst.viewModel.setValue(mdata);
    });
  }

  @action setValue(data) {
    // 修改单据数据
    this.inst.viewModel.setValue(data);
  }

  @action async save(data, {
    showTip = true,
    hideError = false,
  }) {
    if (!data.code) {
      if (!hideError) {
        message.error(i18n.t('单据编号不能为空，保存失败!'), 1);
      }
      return;
    }
    const result = await socket.command('SaveVoucher', data);
    await runInAction(async () => {
      if (!result || result.errno > 0) {
        if (!hideError) {
          message.error((result && result.errmsg) || i18n.t('保存失败!'), 1);
        }
        return false;
      }
      this.inst.options.code = data.code;
      if (showTip) {
        message.success(i18n.t('单据保存成功!'));
      }
      if (this.inst.viewModel.state === 'NEW') {
        this.inst.viewModel.setValue({
          state: 'READONLY'
        });
        history.replace(`/${this.inst.options.orgid}/${this.inst.options.mid}/${this.inst.options.code}`);
      } else {
        this.inst.viewModel.setValue({
          state: 'READONLY'
        });
      }
    });
    return true;
  }

  @action async commit() {

  }

  @action async update() {
    // 变更修改
  }

  @action async delete() {

  }
}

export default class VoucherStore {
  @observable items = new Map();

  @action createId({
    orgid,
    mid
  }) {
    return `${orgid}-${mid.replace('/','-')}-${new Date().getTime().toString()}`;
  }

  @action async create(inst) {
    if (this.items.has(inst.id)) {
      return this.items.get(inst.id);
    }
    const it = new Voucher(this, inst);
    if (!inst.viewModel.code) {
      // 单据编号不存在创建一个
      await it.create();
    }
    this.items.set(inst.id, it);
    return it;
  }

  @action async getByCode({
    orgid,
    mid,
    code,
    id
  }, fields = 'id,code') {
    const sm = mid.split('/');
    const data = await socket.query(`${sm[0]}{${sm[1]}{${fields}}}`, {
      orgid,
      code,
      id
    });
    return data && data[sm[0]] && data[sm[0]][sm[1]];
  }
}
