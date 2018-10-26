import {
  message
} from 'antd';
import {i18n,log,history,stores} from 'saas-plat-clientfx';
const {
  warn
} = log;
import {
  map
} from './util';

export const openVoucher = async (ctx, {
  orgid = ctx.orgid,
  sysid = ctx.sysid,
  mid = ctx.mid,
  id
}) => {
  // 跳转过去自动创建新单
  history.push(`/${orgid}/${sysid?sysid+'/':''}${mid}/${id}`);
}

export const openVoucherModal = async (ctx, {
  orgid = ctx.orgid,
  sysid = ctx.sysid,
  mid = ctx.mid,
  id,
  title
}) => {
  stores.ui.modal.show({
    url: `/${orgid}/${sysid?sysid+'/':''}${mid}/${id}`,
    title
  });
}

export const createVoucher = async (ctx, {
  orgid = ctx.orgid,
  sysid = ctx.sysid,
  mid = ctx.mid
}) => {
  // 跳转过去自动创建新单
  history.push(`/${orgid}/${sysid?sysid+'/':''}${mid}`);
}

export const editVoucher = ({
  id
}) => {
  const store = stores.voucherStore.items.get(id);
  if (store) {
    store.changeState('EDIT');
  } else {
    warn('voucher store not found');
  }
}

export const loadVoucher = async ({
  id
}, {
  query,
  variables,
  mapping,
  showLoading = true,
  loadingText
}) => {
  if (!query) {
    warn('voucher query not found');
    message.error(i18n.t('查询未定义，加载数据失败!'), 1);
    return;
  }
  const store = stores.voucherStore.items.get(id);
  if (store) {
    if (showLoading) {
      stores.ui.loading.show(loadingText || i18n.t('单据加载中...'));
    }
    await store.load(query, variables, async (data) => {
      return await map(
        data,
        mapping
      )
    });
    if (showLoading) {
      stores.ui.loading.hide();
    }
  } else {
    warn('voucher store not found');
  }
}

export const saveVoucher = async ({
  viewModel,
  orgid,
  mid,
  id
}, {
  mapping,
  showLoading = true,
  loadingText,
  showTip,
  hideError,
}) => {
  if (!mapping) {
    warn('voucher mapping not found');
    message.error(i18n.t('单据定义异常，保存失败!'), 1);
    return;
  }
  const store = stores.voucherStore.items.get(id);
  if (store) {
    if (await viewModel.validate()) {
      if (showLoading) {
        stores.ui.loading.show(loadingText || i18n.t('保存单据中...'));
      }
      await store.save({
        ...(await map(viewModel, mapping)),
        orgid,
        mid
      }, {
        showTip,
        hideError,
      });
      if (showLoading) {
        stores.ui.loading.hide();
      }
    }
  } else {
    warn('voucher store not found');
  }
}

export const showVoucherOptions = ({
  id
}) => {
  const store = stores.voucherStore.items.get(id);
  if (store) {
    store.showOptions(true);
  } else {
    warn('voucher store not found');
  }
}

export const hideVoucherOptions = ({
  id
}) => {
  const store = stores.voucherStore.items.get(id);
  if (store) {
    store.showOptions(false);
  } else {
    warn('voucher store not found');
  }
}
