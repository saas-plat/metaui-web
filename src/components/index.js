import {
  UIStore,
  ContainerModel,
  SimpleModel,
  TableModel,
  ReportModel
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
  view: [Layout, ContainerModel],
  toolbar: [Toolbar, ContainerModel],
  buttongroup: [ToolButtonGroup, ContainerModel],
  buttons: [ToolButtons, ContainerModel],
  button: [ButtonItem, SimpleModel],

  //  input
  text: [InputItem, SimpleModel],
  // 只读文本
  readonly: [InputItem, SimpleModel],
  decimal: [InputItem, SimpleModel],
  number: [InputItem, SimpleModel],
  textarea: [InputItem, SimpleModel],
  check: [InputItem, SimpleModel],
  switch: [InputItem, SimpleModel],
  date: [InputItem, SimpleModel],
  month: [InputItem, SimpleModel],
  daterange: [InputItem, SimpleModel],
  week: [InputItem, SimpleModel],
  time: [InputItem, SimpleModel],
  select: [InputItem, SimpleModel],
  treeselect: [InputItem, SimpleModel],
  refer: [InputItem, SimpleModel],
  // 子表
  subtable: [InputItem, SimpleModel],
  // 可编辑主表
  editabletable: [EditableTable, TableModel],

  // form
  form: [Form, ContainerModel],
  voucher: [Voucher, ContainerModel],
  listgroup: [ListGroup, ContainerModel],
  voucherOptions: [VoucherOptions, ContainerModel],
  voucherSelector: [VoucherSelector, ContainerModel],

  // display
  table: [Table, TableModel],
  // treetable: [TreeTable, ContainerModel],
  chart: [Chart, ReportModel],
})
