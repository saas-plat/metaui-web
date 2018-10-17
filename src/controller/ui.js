import {
  message,
  Modal,
  notification
} from 'antd';
import {
  ui
} from '../stores';

export const showMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.info(content, duration, onClose);
}
export const successMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.success(content, duration, onClose);
}
export const errorMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.error(content, duration, onClose);
}
export const warningMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.warning(content, duration, onClose);
}
export const warnMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.warn(content, duration, onClose);
}
export const loadingMessage = async (ctx, {
  content,
  duration,
  onClose
}) => {
  message.loading(content, duration, onClose);
}

export const showModal = async (ctx, args) => {
  Modal.info(args);
}
export const successModal = async (ctx, args) => {
  Modal.success(args);
}
export const errorModal = async (ctx, args) => {
  Modal.error(args);
}
export const warningModal = async (ctx, args) => {
  Modal.warning(args);
}
export const warnModal = async (ctx, args) => {
  Modal.warning(args);
}
export const confirmModal = async (ctx, args) => {
  Modal.confirm(args);
}

export const showNotification = async (ctx, args) => {
  notification.info(args);
}
export const successNotification = async (ctx, args) => {
  notification.success(args);
}
export const errorNotification = async (ctx, args) => {
  notification.error(args);
}
export const warningNotification = async (ctx, args) => {
  notification.warning(args);
}
export const warnNotification = async (ctx, args) => {
  notification.warn(args);
}
export const closeNotification = async (ctx, args) => {
  notification.close(args);
}
export const destroyNotification = async (ctx, args) => {
  notification.destroy(args);
}

export const changeLayoutColSpan = async (ctx, {
  autoCol,
  colSpan
}) => {
  if (!Array.isArray(colSpan)) {
    colSpan = [colSpan];
  }
  // 保证是数值类型
  colSpan = colSpan.filter(v => parseInt(v));
  ui.layout.update({
    autoCol: !!autoCol,
    colSpan
  });
}
