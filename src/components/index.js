import {
  UIStore
} from 'saas-plat-metaui';
// common
import Layout from './Layout';

// input
import {
  Toolbar,
  ToolButtonGroup,
  ToolButtons,
  ButtonItem
} from './Toolbar';
import InputItem from './InputItem';
import EditableTable from './EditableTable';
// form
import Form from './Form';
import Voucher from './Voucher';
import ListGroup from './ListGroup';
import VoucherOptions from './components/Options';
import VoucherSelector from './components/Selector';
// display
import Table from './Table';
import Chart from './Chart';

UIStore.register({
  // common
  layout: Layout,
  toolbar: Toolbar,
  buttongroup: ToolButtonGroup,
  buttons: ToolButtons,
  button: ButtonItem,

  //  input
  text: InputItem,
  // 只读文本
  readonly: InputItem,
  decimal: InputItem,
  number: InputItem,
  textarea: InputItem,
  check: InputItem,
  switch: InputItem,
  date: InputItem,
  month: InputItem,
  daterange: InputItem,
  week: InputItem,
  time: InputItem,
  select: InputItem,
  treeselect: InputItem,
  refer: InputItem, 
  // 子表
  subtable: InputItem,
  // 可编辑主表
  editabletable: EditableTable,

  // form
  form: Form,
  voucher: Voucher,
  listgroup: ListGroup,
  voucherOptions:VoucherOptions,
  voucherSelector:VoucherSelector,

  // display
  table: Table,
  // treetable: TreeTable,
  chart: Chart,
})
