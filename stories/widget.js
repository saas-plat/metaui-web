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
import dataAddon from '../.storybook/data/dataAddon';
import '../src';

const data = {}

const bigdata = UIStore.create({
  name: 'table',
  type: 'table',

}, data).ui;

const subtotal = UIStore.create({
  name: 'table',
  type: 'table',

}, data).ui;

const bar = UIStore.create({
  type: 'chart',

}, data).ui;

const pie = UIStore.create({
  type: 'chart',

}, data).ui;

const line = UIStore.create({
  type: 'chart',

}, data).ui;

storiesOf('其他', module)
  .addParameters({
    data
  })
  .addDecorator(dataAddon)
  .add('Options', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}>
      <UIRender ui={bigdata}/>
    </UIContainer>)

  .add('Search Planel', () => <UIContainer
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}>
        <UIRender ui={subtotal}/>
      </UIContainer>)
