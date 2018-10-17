import i18n from '../i18n';
import {
  ui
} from '../stores';

export const none = () => {}

export const loading = async (ctx, {
  text
}) => {
  ui.load(true, text || i18n.t('加载中...'));
}

export const hideLoading = async () => {
  ui.load(false);
}
