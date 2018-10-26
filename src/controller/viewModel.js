import {
  message
} from 'antd';
import {i18n,log,socket,stores} from 'saas-plat-clientfx';
const {
  warn
} = log;
import {
  map
} from './util';

export const setValue = async ({
  viewModel
}, {
  target,
  value,
  name
}) => {
  if (target && viewModel) {
    const setField = target.setValue || target.value;
    if (setField) {
      const data = {};
      data[setField] = value || await map(value, target.mapping);
      await viewModel.setValue(data);
    } else {
      log('setValue field not found, skip setValue');
    }
  } else {
    setField({
      viewModel,
      name,
      value
    });
  }
}

export const changeState = async ({
  viewModel
}, {
  state
}) => {
  if (viewModel && viewModel.hasOwnProperty('state')) {
    await viewModel.setValue({
      state
    });
  }
}

export const setField = async ({
  viewModel
}, {
  name,
  value
}) => {
  if (viewModel && viewModel.hasOwnProperty(name)) {
    await viewModel.setValue({
      [name]: value
    });
  }
}



export const loadData = async ({
  viewModel,
}, {
  query,
  data,
  variables,
  mapping,
  showLoading = true,
  loadingText
}) => {
  if (showLoading) {
    stores.ui.loading.show(loadingText || i18n.t('数据加载中...'));
  }
  try {
    const ret = data || await socket.query(query, variables);
    const mdata = await map(ret, mapping);
    viewModel.setValue(mdata);
  } catch (e) {
    warn(e.message);
    message.error(i18n.t('加载数据失败!'));
  } finally {
    if (showLoading) {
      stores.ui.loading.hide();
    }
  }
}

export const appendData = async ({
  viewModel,
},{
  query,
  variables,
  data,
  mapping,
  showLoading = true,
  loadingText
}) => {
  if (showLoading) {
    stores.ui.loading.show(loadingText || i18n.t('数据加载中...'));
  }
  try {
    const ret = data || await socket.query(query, variables);
    const mdata = await map(ret, mapping);
    viewModel.mergeValue(mdata);
  } catch (e) {
    warn(e.message);
    message.error(i18n.t('加载数据失败!'));
  } finally {
    if (showLoading) {
      stores.ui.loading.hide();
    }
  }
}

export const mergeData = appendData;

export const removeData = async () => {

}
