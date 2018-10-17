import {
  message
} from 'antd';
import i18n from '../i18n';
import {
  warn
} from '../log';
import socket from '../socket';
import {
  map
} from './util';
import {
  ui
} from '../stores';

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
    ui.load(true, loadingText || i18n.t('数据加载中...'));
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
      ui.load(false);
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
    ui.load(true, loadingText || i18n.t('数据加载中...'));
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
      ui.load(false);
    }
  }
}

export const mergeData = appendData;

export const removeData = async () => {

}
