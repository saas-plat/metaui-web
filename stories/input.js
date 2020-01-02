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
  UIStore,
} from 'saas-plat-metaui';
import {
  observable
} from "mobx";
import '../src';
import dataAddon from '../.storybook/data/dataAddon';
import './style.less';

const store = new UIStore();
const data = observable({
  text: 'AAAAAAAAA',
  date: new Date(),
  dates: [new Date(), new Date()],
  time: new Date(),
  number: 10000.33,
  bool: true,
  obj: {
    b: 'BBBBBBBB',
    c: new Date(),
    a: 1000000.55,
  },
  objs: [],
  refobjs: [{
    a: 1,
    b: '1111111111',
    c: new Date()
  }, {
    a: 20.11,
    b: '222222',
    c: new Date()
  }],
  selectes: [1, 2, 3, 4, 100, 1000000.11].map(v => ({
    value: v,
    text:  v.toString()
  })),
  tree: [{
    title: 'Root',
    value: 100,
    children: [{
      title: 'a-1',
      value: 10,
      children: [{
        title: 'a-1-1',
        value: 90
      }]
    }, {
      title: 'a-2',
      b: 200
    }]
  }]
});
store.setModel(data);
const simpletoolbar = store.build(UIStore.createSchema({
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
}));

const toolbar = store.build(UIStore.createSchema({
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
}));

const bigtoolbar = store.build(UIStore.createSchema({
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
}));

const textbox = store.build(UIStore.createSchema({
  type: 'text',
  value: '$text',
  setValue: 'text',
  icon: 'form',
  tip: 'xxxxxxxxxxxxx',
  rules: [{
    required: true
  }]
}));
const intstring = store.build(UIStore.createSchema({
  type: 'text',
  value: '$text',
  setValue: 'text',
  icon: 'form',
  format: 'intstring',
  tip: 'xxxxxxxxxxxxx',
  rules: [{
    required: true
  }]
}));
const textarea = store.build(UIStore.createSchema({
  type: 'textarea',
  value: '$text',
  setValue: 'text',
  icon: 'form',
  tip: 'xxxxxxxxxxxxx',
  rules: [{
    required: true
  }]
}));

const datetime = store.build(UIStore.createSchema({
  type: 'datetime',
  value: '$date',
  setValue: 'date',
  required: true,
  extra: 'xxxxxxxxxxxxx'
}));

const time = store.build(UIStore.createSchema({
  type: 'time',
  value: '$date',
  setValue: 'date',
  text: 'time'
}));

const date = store.build(UIStore.createSchema({
  type: 'date',
  value: '$date',
  setValue: 'date',
  required: true,
  extra: 'xxxxxxxxxxxxx'
}));

const month = store.build(UIStore.createSchema({
  type: 'month',
  value: '$date',
  setValue: 'date',
  text: 'time'
}));

const week = store.build(UIStore.createSchema({
  type: 'week',
  value: '$date',
  setValue: 'date',
  text: 'time'
}));

const daterange = store.build(UIStore.createSchema({
  type: 'daterange',
  value: '$dates',
  setValue: 'dates',
  text: 'time'
}));

const number = store.build(UIStore.createSchema({
  type: 'number',
  value: '$number',
  setValue: 'number',
  text: 'number'
}));

const thousandth = store.build(UIStore.createSchema({
  type: 'number',
  value: '$number',
  setValue: 'number',
  format: 'thousandth',
  text: 'number'
}));

const percentage = store.build(UIStore.createSchema({
  type: 'number',
  value: '$number',
  setValue: 'number',
  format: 'percentage',
  text: 'number'
}));

const check = store.build(UIStore.createSchema({
  type: 'check',
  value: '$bool',
  setValue: 'bool',
  text: 'check'
}));
const switch1 = store.build(UIStore.createSchema({
  type: 'switch',
  value: '$bool',
  setValue: 'bool',
  text: 'check'
}));

const select = store.build(UIStore.createSchema({
  type: 'select',
  value: '$number',
  setValue: 'number',
  dataSource: '$selectes',

}));

const treeselect = store.build(UIStore.createSchema({
  name: 'treesel',
  type: 'select',
  dropdownStyle: 'tree',
  value: '$number',
  setValue: 'number',
  dataSource: '$tree',
  multiple: true,

}));

const reflist = store.build(UIStore.createSchema({
  name: 'item2',
  type: 'refer',
  displayField: 'b',
  value: '$obj',
  setValue: 'obj',
  dropdownStyle: 'list',
  multiple: false,
  showSearch: false,
  dataSource: '$refobjs',
  onFocus: {
    name: 'query',
    query: '=obj1{a,b,c,d,e}',
    variables: '{pid:$id}', // 去掉查询变量一次取出全部
    idField: 'id',
    pidField: 'pid',
    sortField: 'f1', // 树形全部取回来需要按照树结构排序
    mapping: '={f1:$a,f2:$b,f3:$c}',
    pageSize: 200
  }
}));

const reftablemultiple = store.build(UIStore.createSchema({
  name: 'item4',
  type: 'refer',
  displayField: 'b',
  dropdownStyle: 'table',
  //text: 'Aggs.sum($objs,"a")',   // 要是有text没有displayField，就显示一个text
  value: '$objs',     // multiple: true,   是一个数组
  setValue: 'objs',
  multiple: true,
  dataSource: '$refobjs',
  onFocus: {
    name: 'query',
    query: '=obj1{id,pid,a,b,c,d,e}',
    variables: '{pid:$id}',
    mapping: '={f1:$a,f2:$b,f3:$c}',
    idField: 'id',
    pidField: 'pid'
  },
  //leafField: 'leaf',
  columns: [{
    title: 'aaa',
    dataIndex: 'a'
  }, {
    title: 'bbb',
    dataIndex: 'b'
  }, {
    title: 'ccc',
    dataIndex: 'c'
  }]
}));

// treetable和table带tree是不一样的，tree和table是不同的数据结构
const reftable = store.build(UIStore.createSchema({
  name: 'item6',
  type: 'refer',
  dropdownStyle: 'treetable',    // TODO 暂时未支持
  displayField: 'b',
  value: '$obj',
  setValue: 'obj',
  multiple: false,
  dataSource: '$refobjs',
  onFocus: {
    name: 'query',
    query: '=tree{id,pid,a,b,c,d,e}',
    dariables: '{pid:$tree.id}',
    idField: 'id',
    pidField: 'pid',
    sortField: 'a',
  },
  treeDisplayField: 'a',
  treeSelectable: 'leaf', // leaf parent all
  onTreeChange: {
    name: 'query',
    query: '=obj{a,b,c,d,e}',
    variables: '{tid:$tree.id}',
    mapping: '={f1:$a,f2:$b,f3:$c}',
  },
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
    dataIndex: 'd'
  }],
}));

const subtable = store.build(UIStore.createSchema({
  name: 'subtable',
  text: 'subtable',
  type: 'subtable',
  value: '$refobjs',
  setValue: 'refobjs',
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
}));

const edittable = store.build(UIStore.createSchema({
  name: 'subtable',
  type: 'edittable',
  value: '$refobjs',
  setValue: 'refobjs',
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
}));

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
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={textbox}/>
      <UIRender ui={intstring}/>
      <UIRender ui={textarea}/>
    </UIContainer>)
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
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={number}/>
      <UIRender ui={thousandth}/>
      <UIRender ui={percentage}/>
    </UIContainer>)
  .add('CheckBox', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={check}/>
      <UIRender ui={switch1}/>
    </UIContainer>)

  .add('Select', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
    <UIRender ui={select}/>
    <UIRender ui={treeselect}/>
    </UIContainer>)

  .add('Refer', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={reflist}/>
      <UIRender ui={reftable}/>
      <UIRender ui={reftablemultiple}/>
    </UIContainer>)

  .add('InputTable', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={subtable}/>
    </UIContainer>)

  .add('EditTable', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={edittable}/>
    </UIContainer>)
