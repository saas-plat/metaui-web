import React from 'react';
import {
  Input,
  Button,
  notification,
  message,
  Modal
} from 'antd';
import {
  registerFeedback
} from 'saas-plat-metaui';

registerFeedback({
  // 轻信息，无操作自动消失
  message: (content, duration, type, onClose) => {
    switch (type) {
    case 'info':
      message.info(content, duration, onClose)
      break;
    case 'error':
      message.error(content, duration, onClose)
      break;
    case 'warning':
      message.warning(content, duration, onClose)
      break;
    case 'loading':
      message.loading(content, duration, onClose)
      break;
    default:
      message.success(content, duration, onClose)
      break;
    }
    return () => message.destroy();
  },
  // 警告
  alert: (title, content, type, okText, onOk) => {
    let modal;
    switch (type) {
    case 'success':
      modal = Modal.success({
        title,
        content,
        okText,
        onOk
      });
      break;
    case 'error':
      modal = Modal.error({
        title,
        content,
        okText,
        onOk
      });
      break;
    case 'warning':
      modal = Modal.warning({
        title,
        content,
        okText,
        onOk
      });
      break;
    case 'loading':
      modal = Modal.success({
        title,
        content,
        okText,
        onOk
      });
      break;
    default:
      modal = Modal.info({
        title,
        content,
        okText,
        onOk
      });
      break;
    }
    return () => modal.destroy();
  },
  // 确认是否
  confirm: (title, content, okText, cancelText, onOk, onCancel) => {
    const modal = Modal.confirm({
      title,
      content,
      okText,
      cancelText,
      onOk,
      onCancel
    });
    return () => modal.destroy();
  },
  // 安全确认，需要输入安全码
  secure: (title, placeholder, okText, cancelText, onOk, onCancel) => {
    let txt;
    const modal = Modal.confirm({
      title,
      content: <Input.Password placeholder={placeholder} onChange={(val)=>txt=val}/>,
      okText,
      cancelText,
      onOk() {
        onOk(txt)
      },
      onCancel
    });
    return () => modal.destroy();
  },
  // 提醒
  notification: (message, description, duration, onClose, btns, onClick) => {
    const nk = `notification${Date.now().getTime()}`;
    const btn = btns.map(({
        key,
        text,
        type
      }) =>
      <Button key={key} type={type} size="small" onClick={() => {notification.close(nk);onClick(key)}}>
        {text}
      </Button>
    );
    notification.open({
      message,
      description,
      duration,
      btn,
      key: nk,
      onClose: onClose,
    });
    return () => notification.close(nk);
  }
})
