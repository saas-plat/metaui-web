import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import ViewModel from '../src/viewmodel';
import TemplateProvider from '../src/components/TemplateProvider';
import InputItem from '../src/components/InputItem';
import EditableTable from '../src/components/EditableTable';

const model = {
  text: 'AAAAAAAAA',
  date: new Date(),
  time: new Date(),
  number: 10000.33,
  bool: true,
  obj: {
    f1: 'BBBBBBBB',
    date: new Date(),
    f3: 1000000.55,
  },
  objarr: [{
    a: 1
  }, {
    a: 20.11
  }],
  array: [1, 2, 3, 4, 100, 1000000.11],
  tree: [{
    id: 'a',
    a: 'Root',
    b: 100
  }, {
    id: 'a-1',
    pid: 'a',
    a: 'a-1',
    b: 10
  }, {
    id: 'a-1-1',
    pid: 'a-1',
    a: 'a-1-1',
    b: 90
  }, {
    id: 'a-2',
    pid: 'a',
    a: 'a-2',
    b: 200
  }]
};

const textbox = ViewModel.create({
  type: 'text',
  value: 'text',
  icon: 'form',
  tip: 'xxxxxxxxxxxxx',
  rules: [{
    required: true
  }]
}, model);

const datetime = ViewModel.create({
  type: 'datetime',
  value: 'date',
  required: true,
  extra: 'xxxxxxxxxxxxx'
}, model);

const time = ViewModel.create({
  type: 'time',
  value: 'date',
  text: 'time'
}, model);

const number = ViewModel.create({
  type: 'number',
  value: 'number',
  format: 'thousandth',
  text: 'number'
}, model);

const check = ViewModel.create({
  type: 'check',
  value: 'bool',
  text: 'check'
}, model);

const switchbox = ViewModel.create({
  type: 'switch',
  value: 'bool',
}, model);

const select = ViewModel.create({
  type: 'select',
  value: 'number',
  dataSource: '$array',
  displayField: 'a',
  valueField: 'b',
  sortField: 'a',
}, model);

const treeselect = ViewModel.create({
  name: 'treesel',
  type: 'treeselect',
  value: 'number',
  dataSource: '$tree',
  multiple: true,
  displayField: 'a',
  valueField: 'b',
  idField: 'id',
  pidField: 'pid',
  sortField: 'a',
}, model);

const refselect = ViewModel.create({
  name: 'item2',
  text: 'item2',
  type: 'refselect',
  dropdownStyle: 'list',
  value: 'obj.f1',
  multiple: true,
  query: '=obj1{a,b,c,d,e}',
  displayField: 'a',
  sortField: 'a', // 树形全部取回来需要按照树结构排序
  mapping: '={f1:$a,f2:$b,f3:$c}',
  setValue: 'obj',
  pageSize: 200
}, model);

const reftree = ViewModel.create({
  name: 'item3',
  text: 'item3',
  type: 'refselect',
  dropdownStyle: 'tree',
  value: 'obj.f1',
  expandAll: true,
  //expandedKeys:[],
  range: 'leaf', // leaf parent all
  query: '=obj1{id,pid,a,b,c,d,e,leaf}',
  variables: '{pid:$id}', // 去掉查询变量一次取出全部
  idField: 'id',
  pidField: 'pid',
  displayField: ['a'],
  leafField: 'leaf',
  mapping: '={f1:$a,f2:$b,f3:$c}',
  setValue: 'obj'
}, model);

const reftable = ViewModel.create({
  name: 'item4',
  text: 'item4',
  type: 'refselect',
  dropdownStyle: 'table',
  value: 'Aggs.sum(objarr,"a")',
  query: 'obj1{id,pid,a,b,c,d,e}',
  variables: '{pid:$id}',
  idField: 'id',
  pidField: 'pid',
  leafField: 'leaf',
  columns: [{
    title: 'aaa',
    value: 'a'
  }, {
    title: 'bbb',
    value: 'b'
  }, {
    title: 'ccc',
    value: 'c'
  }, {
    title: 'ddd',
    value: 'd'
  }],
  mapping: '={f1:$a,f2:$b,f3:$c}',
  setValue: 'objarr'
}, model);

const reftreetable = ViewModel.create({
  name: 'item6',
  text: 'item6',
  type: 'refselect',
  dropdownStyle: 'treetable',
  value: 'Aggs.sum(objarr,"a")',
  multiple: false,
  range: 'leaf', // leaf parent all
  treequery: '=obj1{id,pid,a,b,c,d,e}',
  idField: 'id',
  pidField: 'pid',
  treeDisplayField: 'a',
  treeSelectable: true,
  tableQuery: '=obj{a,b,c,d,e}',
  tableVariables: '{objid:$id}',
  columns: [{
    title: 'aaa',
    value: 'a'
  }, {
    title: 'bbb',
    value: 'b'
  }, {
    title: 'ccc',
    value: 'c'
  }, {
    title: 'ddd',
    value: 'd'
  }],
  mapping: '={f1:$a,f2:$b,f3:$c}',
  setValue: 'objarr'
}, model);

const inputtable = ViewModel.create({
  name: 'inputtable',
  text: 'inputtable',
  type: 'inputtable',
  value: 'objarr',
  table: {

  }
}, model);

const editabletable = ViewModel.create({
  name: 'inputtable',
  type: 'editabletable',
  value: 'objarr',
  table: {

  }
}, model);

storiesOf('数据录入', module)
  .add('TextBox', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={textbox}/></TemplateProvider>)
  .add('DatePicker', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={datetime}/></TemplateProvider>)
  .add('TimeBox', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={time}/></TemplateProvider>)
  .add('NumberBox', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={number}/></TemplateProvider>)
  .add('CheckBox', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={check}/></TemplateProvider>)
  .add('Switch', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={switchbox}/></TemplateProvider>)
  .add('Select', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={select}/></TemplateProvider>)
  .add('TreeSelect', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={treeselect}/></TemplateProvider>)
  .add('RefSelect', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={refselect}/></TemplateProvider>)
  .add('RefTree', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={reftree}/></TemplateProvider>)
  .add('RefTable', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={reftable}/></TemplateProvider>)
  .add('RefTreeTable', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={reftreetable}/></TemplateProvider>)
  .add('InputTable', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><InputItem config={inputtable}/></TemplateProvider>)
  .add('EditableTable', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><EditableTable config={editabletable}/></TemplateProvider>)
