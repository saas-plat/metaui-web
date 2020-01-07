import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import {
  UIContainer,
  UIStore,
  UIRender
} from 'saas-plat-metaui';
import '../src';

const data = {
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

const tabs = UIStore.create({
  type: 'tab',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const groups = UIStore.create({
  type: 'group',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const collapses = UIStore.create({
  type: 'collapse',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const flow = UIStore.create({
  type: 'view',
  layout: 'flow',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const list = UIStore.create({
  type: 'view',
  layout: 'vertical',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const grid = UIStore.create({
  type: 'view',
  layout: 'grid',
  items: [{
    type: 'text',
    value: '$code',
    label: '编码',
  }, {
    type: 'text',
    value: '$item1',
    label: 'item1',
  }, {
    type: 'text',
    value: '$obj2.f1',
    label: 'f1',
  }, {
    type: 'text',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}, data)

const topbottom = UIStore.create({
  type: 'view',
  layout: 'sidercontent',
  items: [{
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
  }, {
    type: 'view',
    items: [{
      type: 'text',
      value: '$code',
      label: '编码',
    }, {
      type: 'text',
      value: '$item1',
      label: 'item1',
    }, {
      type: 'text',
      value: '$obj2.f1',
      label: 'f1',
    }, {
      type: 'text',
      value: '$obj2.f2',
      label: 'f2',
    }, {
      type: 'text',
      value: '$obj2.f3',
      label: 'f3',
    }]
  }]
}, data)

const sidercontent = UIStore.create({
  type: 'view',
  layout: 'sidercontent',
  items: [{
    type: 'view',
    items: [{
      type: 'text',
      value: '$code',
      label: '编码',
    }, {
      type: 'text',
      value: '$item1',
      label: 'item1',
    }]
  }, {
    type: 'view',
    items: [{
      type: 'text',
      value: '$obj2.f1',
      label: 'f1',
    }, {
      type: 'text',
      value: '$obj2.f2',
      label: 'f2',
    }, {
      type: 'text',
      value: '$obj2.f3',
      label: 'f3',
    }]
  }, ]
}, data)

storiesOf('布局类', module)
  .addParameters({
    data
  })
  .add('Group', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}>
        <UIRender ui={groups}/>
        <UIRender ui={tabs}/>
        <UIRender ui={collapses}/>
      </UIContainer>)
      
  .add('FlowLayout', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={flow}/>
    </UIContainer>)
  .add('ListLayout', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}>
        <UIRender ui={list}/>
      </UIContainer>)
  .add('GridLayout', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}>
        <UIRender ui={grid}/>
      </UIContainer>)
  .add('PortalLayout', () => <UIContainer
        onEvent={(name,args)=>action(name)(args)}
        onAction={(name,args)=>action(name)(args)}>
          <UIRender ui={topbottom}/>
          <UIRender ui={sidercontent}/>
        </UIContainer>)
