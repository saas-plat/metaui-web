import {
  UIStore,
  ContainerModel,
  SimpleModel,
  TableModel,
  ReportModel,
  ReferModel,
  FilterModel
} from 'saas-plat-metaui';
// layout
import Layout from './Layout';
import TabGroup from './TabGroup';
import TitleGroup from './TitleGroup';
// input
import {
  Toolbar,
  ToolButtonGroup,
  ToolButtons,
  ButtonItem
} from './Toolbar';
import InputItem from './InputItem';
import EditableTable from './EditableTable';
import EditableTree from './EditableTree';
import Options from './Options';
// display
import Table from './Table';
import Chart from './Chart';

UIStore.register({
  // layout
  view: [Layout, ContainerModel],
  tab: [TabGroup, ContainerModel],
  group: [TitleGroup, ContainerModel],
  toolbar: [Toolbar, ContainerModel],
  buttongroup: [ToolButtonGroup, ContainerModel],
  buttons: [ToolButtons, ContainerModel],

  // input
  button: [ButtonItem, SimpleModel],
  text: [InputItem, SimpleModel],
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
  // 对象引用
  refer: [InputItem, ReferModel],
  // 子表编辑器
  subtable: [InputItem, TableModel],
  // 可编辑主表
  edittable: [EditableTable, TableModel],
  // 分类编辑器
  edittree: [EditableTree, TableModel],
  // 选项编辑器
  options: [Options, TableModel],
  search: [Options, FilterModel],

  // display
  table: [Table, TableModel],
  // treetable: [TreeTable, ContainerModel],
  chart: [Chart, ReportModel],
})
