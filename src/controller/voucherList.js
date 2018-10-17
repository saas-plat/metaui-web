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
  listStore
} from '../stores';

export const loadVoucherList = async (ctx, {
  query,
  variables,
  mapping
}) => {
  if (!query) {
    warn('voucher query not found');
    message.error(i18n.t('查询未定义，加载数据失败!'), 1);
    return;
  }

  await listStore.load(query, variables, async (data) => {
    return await map(
      data,
      mapping
    )
  });
}
