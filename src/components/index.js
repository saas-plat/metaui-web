import {
  UIStore,
  ButtonModel,
  InputModel,
  FormModel,
  ContainerModel,
  EditTableModel,
  TableModel,
  ChartModel,
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
  layout: {
    component: Layout,
    model: ContainerModel
  },
  toolbar: {
    component: Toolbar,
    model: ContainerModel
  },
  buttongroup: {
    component: ToolButtonGroup,
    model: ContainerModel
  },
  buttons: {
    component: ToolButtons,
    model: ContainerModel
  },
  button: {
    component: ButtonItem,
    model: ButtonModel
  },

  //  input
  text: {
    component: InputItem,
    model: InputModel
  },
  // 只读文本
  readonly: {
    component: InputItem,
    model: InputModel
  },
  decimal: {
    component: InputItem,
    model: InputModel
  },
  number: {
    component: InputItem,
    model: InputModel
  },
  textarea: {
    component: InputItem,
    model: InputModel
  },
  check: {
    component: InputItem,
    model: InputModel
  },
  switch: {
    component: InputItem,
    model: InputModel
  },
  date: {
    component: InputItem,
    model: InputModel
  },
  month: {
    component: InputItem,
    model: InputModel
  },
  daterange: {
    component: InputItem,
    model: InputModel
  },
  week: {
    component: InputItem,
    model: InputModel
  },
  time: {
    component: InputItem,
    model: InputModel
  },
  select: {
    component: InputItem,
    model: InputModel
  },
  listselect: {
    component: InputItem,
    model: InputModel
  },
  treeselect: {
    component: InputItem,
    model: InputModel
  },
  refselect: {
    component: InputItem,
    model: InputModel
  },
  reftreeselect: {
    component: InputItem,
    model: InputModel
  },
  // 子表
  subtable: {
    component: InputItem,
    model: InputModel
  },
  // 可编辑主表
  editabletable: {
    component: EditableTable,
    model: EditTableModel
  },

  // form
  form: {
    component: Form,
    model: FormModel
  },
  voucher: {
    component: Voucher,
    model: FormModel
  },
  listgroup: {
    component: ListGroup,
    model: FormModel
  },
  voucherOptions:{
    component: VoucherOptions,
    model: FormModel
  },
  voucherSelector:{
    component: VoucherSelector,
    model: FormModel
  },

  // display
  table: {
    component: Table,
    model: TableModel
  },
  // treetable: {
  //   component: TreeTable,
  //   model: TreeModel
  // },
  chart: {
    component: Chart,
    model: ChartModel
  },
})
