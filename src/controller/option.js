import {
  message
} from 'antd';
import i18n from '../i18n';
import {
  warn
} from '../log';
import {
  map
} from './util';
import {
  optionStore
} from '../stores';

export const editOption = async ({
  id
}) => {
  const store = optionStore.items.get(id);
  if (store) {
    store.changeState('EDIT');
  } else {
    warn('voucher store not found');
  }
}

export const loadOption = async ({
  id
}, {
  query,
  variables,
  mapping,
  state = 'EDIT'
}) => {
  if (!query) {
    warn('option query not found');
    message.error(i18n.t('选项定义异常，加载数据失败!'), 1);
    return;
  }
  const store = optionStore.items.get(id);
  if (store) {
    await store.load(query, variables, async (data) => {
      return await map(
        data,
        mapping
      );
    });
    if (state) {
      store.changeState(state);
    }
  } else {
    warn('option store not found');
  }
}

export const saveOption = async ({
  viewModel,
  orgid,
  mid,
  id,
}, {
  mapping,
  showLoading,
  showTip,
  hideError
}) => {
  if (!mapping) {
    warn('option mapping not found');
    message.error(i18n.t('选项定义异常，保存失败!'), 1);
    return;
  }
  const store = optionStore.items.get(id);
  if (store) {
    if (await viewModel.validate()) {
      await store.save({
        ...(await map(viewModel, mapping)),
        orgid,
        mid
      }, {
        showLoading,
        showTip,
        hideError,
      });
    }
  } else {
    warn('option store not found');
  }
}
