import {
  MetaUI,
  ContainerModel,
  SimpleModel,
  TableModel,
  ReportModel,
  ReferModel,
  FilterModel,
  ListModel,
  TreeModel
} from '@saas-plat/metaui';
// layout
import Layout from './Layout';
import Group from './Group';
// input
import {
  Toolbar,
  ToolButtonGroup,
  ButtonItem
} from './Toolbar';
import InputItem from './InputItem';
import EditTable from './EditTable';
import EditTree from './EditTree';
import Search from './Search';
// display
import DataTable from './DataTable';
import Chart from './Chart';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

MetaUI.register({
  // layout
  view: [Layout, ContainerModel],
  group: [Group, ContainerModel],
  toolbar: [Toolbar, ContainerModel],
  buttongroup: [ToolButtonGroup, ContainerModel],
  buttons: [Toolbar, ContainerModel],

  // input
  button: [ButtonItem, SimpleModel],
  text: [InputItem, SimpleModel],
  decimal: [InputItem, SimpleModel],
  number: [InputItem, SimpleModel],
  textarea: [InputItem, SimpleModel],
  check: [InputItem, SimpleModel],
  switch: [InputItem, SimpleModel],
  datetime: [InputItem, SimpleModel],
  date: [InputItem, SimpleModel],
  month: [InputItem, SimpleModel],
  daterange: [InputItem, SimpleModel],
  week: [InputItem, SimpleModel],
  time: [InputItem, SimpleModel],
  select: [InputItem, SimpleModel],
  // 对象引用
  refer: [InputItem, ReferModel],
  // 子表编辑器
  subtable: [InputItem, TableModel],
  // 可编辑主表
  edittable: [EditTable, TableModel],
  // 分类编辑器
  edittree: [EditTree, TableModel],
  search: [Search, FilterModel],

  // display
  table: [DataTable, TableModel],
  // treetable: [TreeTable, ContainerModel],
  chart: [Chart, ReportModel],
})
