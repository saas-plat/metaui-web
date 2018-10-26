import {
  message
} from 'antd';
import {i18n,log,stores} from 'saas-plat-clientfx';
const {
  warn
} = log;
import {
  map
} from './util';


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

  await stores.listStore.load(query, variables, async (data) => {
    return await map(
      data,
      mapping
    )
  });
}
