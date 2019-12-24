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

const form = UIStore.create({
  type: 'view',
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
  }]
}, data)

const voucher = UIStore.create({
  type: 'view',
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
  }]
}, data)

storiesOf('布局类', module)
  .add('Form', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={form}/></UIContainer>)
  .add('Voucher', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><UIRender ui={voucher}/></UIContainer>)
  .add('Archive', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><UIRender ui={voucher}/></UIContainer>)
  .add('List', () => <UIContainer
        onEvent={(name,args)=>action(name)(args)}
        onAction={(name,args)=>action(name)(args)}><UIRender ui={voucher}/></UIContainer>)
  .add('TreeList', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><UIRender ui={voucher}/></UIContainer>)
