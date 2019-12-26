import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import {
  UIRender,
  UIContainer,
  UIStore
} from 'saas-plat-metaui';
import {
  observable
} from "mobx";
import '../src';
import dataAddon from '../.storybook/data/dataAddon';
import './style.less';

const data = observable({
  text: 'AAAAAAAAA',
  date: new Date(),
  dates: [new Date(),new Date()],
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
});

const simpletoolbar = UIStore.create({
  name: 'toolbar',
  type: 'buttongroup',
  items: [{
    type: 'button',
    text: 'Button1',
    style: 'primary'
  }, {
    type: 'button',
    text: 'Button2'
  }, {
    type: 'button',
    text: 'Button3'
  }, {
    type: 'button',
    text: 'Button4'
  }]
}, data).ui;

const toolbar = UIStore.create({
  name: 'toolbar',
  type: 'buttons',
  items: [{
    type: 'view',
    layout: 'left',
    items: [{
      type: 'button',
      text: '$text',
      style: 'primary'
    }, {
      type: 'button',
      text: 'Button2'
    }]
  }, {
    type: 'view',
    layout: 'right',
    items: [{
      type: 'button',
      text: 'Button3',
      style: 'link'
    }, {
      type: 'button',
      text: 'Button4',
      style: 'link'
    }]
  }]
}, data).ui;

const bigtoolbar = UIStore.create({
  name: 'toolbar',
  type: 'toolbar',
  items: [{
    type: 'view',
    layout: 'left',
    items: [{
      type: 'button',
      text: 'Button1',
      onClick: 'action1',
      name: 'Button1',
      items: [{
        type: 'button',
        text: 'DropdownButton1',
        items: [{
          type: 'buttongroup',
          text: 'group1',
          items: [{
            type: 'button',
            text: 'ChildDropdownButton1'
          }, {
            type: 'button',
            text: 'ChildDropdownButton2'
          }]
        }, {
          type: 'buttongroup',
          text: 'group2',
          items: [{
            type: 'button',
            text: 'ChildDropdownButton5'
          }, {
            type: 'button',
            text: 'ChildDropdownButton6'
          }]
        }]
      }, {
        type: 'button',
        text: 'DropdownButton2',
        items: [{
          type: 'button',
          text: '',
          items: [{
            type: 'button',
            text: 'ChildDropdownButton3'
          }, {
            type: 'button',
            text: 'ChildDropdownButton4'
          }]
        }]
      }]
    }, {
      type: 'button',
      text: 'Button2',
      style: 'link'
    }]
  }, {
    type: 'view',
    layout: 'right',
    items: [{
      type: 'button',
      text: 'Button3',
      style: 'link'
    }, {
      type: 'button',
      text: 'Button4',
      style: 'link'
    }]
  }]
}, data).ui;

const textbox = UIStore.create({
  type: 'text',
  value: '$text',
  setValue: 'text',
  icon: 'form',
  tip: 'xxxxxxxxxxxxx',
  rules: [{
    required: true
  }]
}, data).ui;

const datetime = UIStore.create({
  type: 'datetime',
  value: '$date',
  setValue: 'date',
  required: true,
  extra: 'xxxxxxxxxxxxx'
}, data).ui;

const time = UIStore.create({
  type: 'time',
  value: '$date',
  setValue: 'date',
  text: 'time'
}, data).ui;

const date = UIStore.create({
  type: 'date',
  value: '$date',
  setValue: 'date',
  required: true,
  extra: 'xxxxxxxxxxxxx'
}, data).ui;

const month = UIStore.create({
  type: 'month',
  value: '$date',
  setValue: 'date',
  text: 'time'
}, data).ui;

const week = UIStore.create({
  type: 'week',
  value: '$date',
  setValue: 'date',
  text: 'time'
}, data).ui;

const daterange = UIStore.create({
  type: 'daterange',
  value: '$dates',
  setValue: 'dates',
  text: 'time'
}, data).ui;

const number = UIStore.create({
  type: 'number',
  value: '$number',
  setValue: 'number',
  format: 'thousandth',
  text: 'number'
}, data).ui;

const check = UIStore.create({
  type: 'check',
  value: '$bool',
  setValue: 'bool',
  text: 'check'
}, data).ui;

const select = UIStore.create({
  type: 'select',
  value: '$number',
  setValue: 'number',
  dataSource: '$array',
  displayField: 'a',
  valueField: 'b',
  sortField: 'a',
}, data).ui;

const treeselect = UIStore.create({
  name: 'treesel',
  type: 'select',
  dropdownStyle: 'tree',
  value: '$number',
  setValue: 'number',
  dataSource: '$tree',
  multiple: true,
  displayField: 'a',
  valueField: 'b',
  idField: 'id',
  pidField: 'pid',
  sortField: 'a',
}, data).ui;

const reflist = UIStore.create({
  name: 'item2',
  text: 'item2',
  type: 'refer',
  value: '$obj.f1',
  setValue: 'obj',
  dropdownStyle: 'list',
  multiple: false,
  showSearch: true,
  query: '=obj1{a,b,c,d,e}',
  variables: '{pid:$id}', // 去掉查询变量一次取出全部
  idField: 'id',
  pidField: 'pid',
  displayField: 'f1',
  sortField: 'f1', // 树形全部取回来需要按照树结构排序
  mapping: '={f1:$a,f2:$b,f3:$c}',
  pageSize: 200
}, data).ui;

const reftable = UIStore.create({
  name: 'item4',
  text: 'item4',
  type: 'refer',
  dropdownStyle: 'table',
  multiple: true,
  value: '$obj',
  setValue: 'obj',
  displayField: 'f1',
  query: '=obj1{id,pid,a,b,c,d,e}',
  variables: '{pid:$id}',
  mapping: '={f1:$a,f2:$b,f3:$c}',
  idField: 'id',
  pidField: 'pid',
  //leafField: 'leaf',
  columns: [{
    title: 'aaa',
    dataIndex: 'f1'
  }, {
    title: 'bbb',
    dataIndex: 'f2'
  }, {
    title: 'ccc',
    dataIndex: 'f3'
  }]
}, data).ui;

// treetable和table带tree是不一样的，tree和table是不同的数据结构
const reftreetable = UIStore.create({
  name: 'item6',
  text: 'item6',
  type: 'refer',
  dropdownStyle: 'treetable',
  value: 'Aggs.sum($objarr,"a")',
  setValue: 'objarr',
  multiple: false,
  treeQuery: '=tree{id,pid,a,b,c,d,e}',
  treeVariables: '{pid:$tree.id}',
  treeIdField: 'id',
  treePidField: 'pid',
  treeDisplayField: 'a',
  treeSortField: 'a',
  treeSelectable: 'leaf', // leaf parent all
  query: '=obj{a,b,c,d,e}',
  variables: '{tid:$tree.id}',
  columns: [{
    title: 'aaa',
    dataIndex: 'a'
  }, {
    title: 'bbb',
    dataIndex: 'b'
  }, {
    title: 'ccc',
    dataIndex: 'c'
  }, {
    title: 'ddd',
    value: 'd'
  }],
  mapping: '={f1:$a,f2:$b,f3:$c}',
}, data).ui;

const subtable = UIStore.create({
  name: 'subtable',
  text: 'subtable',
  type: 'subtable',
  value: '$objarr',
  setValue: 'objarr',
  columns: [{
    type: 'text',
    title: 'aaa',
    dataIndex: 'a'
  }, {
    type: 'text',
    title: 'bbb',
    dataIndex: 'b'
  }, {
    type: 'text',
    title: 'ccc',
    dataIndex: 'c'
  }, {
    type: 'text',
    title: 'ddd',
    dataIndex: 'd'
  }],
}, data).ui;

const edittable = UIStore.create({
  name: 'subtable',
  type: 'edittable',
  value: '$objarr',
  setValue: 'objarr',
  columns: [{
    type: 'text',
    title: 'aaa',
    dataIndex: 'a'
  }, {
    type: 'text',
    title: 'bbb',
    dataIndex: 'b'
  }, {
    type: 'text',
    title: 'ccc',
    dataIndex: 'c'
  }, {
    type: 'text',
    title: 'ddd',
    dataIndex: 'd'
  }],
}, data).ui;

storiesOf('输入类', module)
  .addParameters({
    data
  })
  .addDecorator(dataAddon)
  .add('Toolbar', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
    <UIRender ui={simpletoolbar}/>
    <UIRender ui={toolbar}/>
    <UIRender ui={bigtoolbar}/>
    </UIContainer>)
  .add('TextBox', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={textbox}/></UIContainer>)
  .add('DatePicker', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
    <UIRender ui={datetime}/>
    <UIRender ui={time}/>
    <UIRender ui={date}/>
    <UIRender ui={month}/>
    <UIRender ui={week}/>
    <UIRender ui={daterange}/>
    </UIContainer>)

  .add('NumberInput', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={number}/></UIContainer>)
  .add('CheckBox', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={check}/></UIContainer>)

  .add('Select', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={select}/></UIContainer>)
  .add('TreeSelect', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={treeselect}/></UIContainer>)
  .add('RefList', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={reflist}/></UIContainer>)
  .add('RefTable', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={reftable}/></UIContainer>)
  .add('RefTreeTable', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><UIRender ui={reftreetable}/></UIContainer>)
  .add('InputTable', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={subtable}/></UIContainer>)
  .add('EditTable', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={edittable}/></UIContainer>)
