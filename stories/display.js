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

const data = {}

const table = UIStore.create({
  name: 'table',
  type: 'table',

}, data).ui;

const chart = UIStore.create({
  type: 'chart',

}, data).ui;

storiesOf('Display', module)
  .add('Table', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={table}/></UIContainer>)

  .add('Chart', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><UIRender ui={chart}/></UIContainer>)
