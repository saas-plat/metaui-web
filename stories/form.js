import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import {UIContainer,ViewStore} from 'saas-plat-metaui';
import {
  Form,
  Voucher,
  ListGroup
} from '../src';

const model = {
  code: '',
  item1: 'AAAAAAAAA',
  obj2: {
    f1: 'BBBBBBBB',
    f2: new Date(),
    f3: 1000000.55,
  },
  objarr: [{
    a: 1
  }, {
    a: 20.11
  }],
  array1: [1, 2, 3, 4, 100, 1000000.11]
};

const viewModel = ViewStore.create({
  type: 'form',
  layout: 'vertical',
  items: [{
    type: 'text',
    value: 'code',
    text: 'code',
    icon: 'form',
    tip: 'xxxxxxxxxxxxx',
    rules: [{
      required: true
    }]
  }, {
    type: 'datetime',
    value: 'obj2.f2',
    text: 'datetime',
    icon: 'lock',
    required: true,
    extra: 'xxxxxxxxxxxxx'
  }, {
    type: 'time',
    value: 'obj2.f2',
    text: 'time'
  }, {
    type: 'number',
    value: 'obj2.f3',
    format: 'thousandth',
    text: 'number'
  }, {
    type: 'check',
    value: 'obj2.f3',
    text: 'check'
  }, {
    type: 'switch',
    value: 'obj2.f3',
    text: 'switch'
  }, {
    type: 'select',
    value: 'array1',
    text: 'select'
  }, {
    type: 'treeselect',
    value: 'array1',
    text: 'treeselect'
  }, {
    name: 'item2',
    text: 'item2',
    type: 'refselect',
    dropdownStyle: 'list',
    value: 'array1',
    multiple: true,
    query: '=obj1{a,b,c,d,e}',
    displayField: 'a',
    sortField: 'a', // 树形全部取回来需要按照树结构排序
    mapping: '={f1:$a,f2:$b,f3:$c}',
    setValue: 'obj2',
    pageSize: 200
  }, {
    name: 'item3',
    text: 'item3',
    type: 'refselect',
    dropdownStyle: 'tree',
    value: 'obj2.f1',
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
    setValue: 'obj2'
  }, {
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
  }, {
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
    tableQuery: '=obj2{a,b,c,d,e}',
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
  }, {
    name: 'inputtable',
    text: 'inputtable',
    type: 'inputtable',
    value: 'array1',
    table: {

    }
  }]
}, model)

const listgroup = ViewStore.create({
  name: 'listgroup',
  type: 'listgroup',

},model);

storiesOf('数据录入', module)
  .add('Form', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><Form config={viewModel}/></UIContainer>)
    .add('Voucher', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><Voucher config={viewModel}/></UIContainer>)
      .add('ListGroup', () => <UIContainer
        onEvent={(name,args)=>action(name)(args)}
        onAction={(name,args)=>action(name)(args)}><ListGroup config={listgroup}/></UIContainer>)
