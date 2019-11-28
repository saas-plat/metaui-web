import React from 'react';
import {
  UIStore,
  InputModel,
  FormModel,
  ContainerModel,
  EditTableModel,
  TableModel,
  ChartModel,
  registerFeedback
} from 'saas-plat-metaui';
import {
  message,
  Modal
} from 'antd';
import InputItem from './components/InputItem';
import Form from './components/Form';
import Voucher from './components/Voucher';
import Toolbar from './components/Toolbar';
import ListGroup from './components/ListGroup';
import Chart from './components/Chart';
import Table from './components/Table';
import EditableTable from './components/EditableTable';
import SecureInput from '../components/SecureInput';

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
  secure: (title, content, placeholder, okText, cancelText, onOk, onCancel) => {
    let txt;
    const modal = Modal.confirm({
      title ,
      content : <SecureInput content={content} onChange={(val)=>txt=val} />,
      onOk() {
       onOk(txt)
      },
      onCancel
    });
    return () => modal.destroy();
  }
})

UIStore.register({
  // common
  'toolbar': {
    component: Toolbar,
    model: ContainerModel
  },

  //  input
  'input': {
    component: InputItem,
    model: InputModel
  },
  'decimal': {
    component: InputItem,
    model: InputModel
  },
  'number': {
    component: InputItem,
    model: InputModel
  },
  'textbox': {
    component: InputItem,
    model: InputModel
  },
  'textarea': {
    component: InputItem,
    model: InputModel
  },
  'checkbox': {
    component: InputItem,
    model: InputModel
  },
  'datepicker': {
    component: InputItem,
    model: InputModel
  },
  'monthpicker': {
    component: InputItem,
    model: InputModel
  },
  'daterange': {
    component: InputItem,
    model: InputModel
  },
  'weekpicker': {
    component: InputItem,
    model: InputModel
  },
  'timepicker': {
    component: InputItem,
    model: InputModel
  },
  'select': {
    component: InputItem,
    model: InputModel
  },
  'listselect': {
    component: InputItem,
    model: InputModel
  },
  'treeselect': {
    component: InputItem,
    model: InputModel
  },
  'refselect': {
    component: InputItem,
    model: InputModel
  },
  'treetableselect': {
    component: InputItem,
    model: InputModel
  },
  'inputtable': {
    component: InputItem,
    model: InputModel
  },
  'editabletable': {
    component: EditableTable,
    model: EditTableModel
  },

  // form
  'form': {
    component: Form,
    model: FormModel
  },
  'voucher': {
    component: Voucher,
    model: FormModel
  },
  'listgroup': {
    component: ListGroup,
    model: FormModel
  },

  // display
  'table': {
    component: Table,
    model: TableModel
  },
  // 'treetable': {
  //   component: TreeTable,
  //   model: TreeModel
  // },
  'chart': {
    component: Chart,
    model: ChartModel
  },
})
