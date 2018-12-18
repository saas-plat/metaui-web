import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import ViewModel from '../src/viewmodel';
import TemplateProvider  from '../src/components/TemplateProvider';
import Toolbar from '../src/components/Toolbar';
import Total from '../src/components/Total';
import AssociateInfo from '../src/components/AssociateInfo';

const model = {}

const toolbar = ViewModel.create({
  name: 'toolbar',
  type: 'toolbar',

},model);

const total = ViewModel.create({
  name: 'total',
  type: 'total',

},model);

const associateinfo = ViewModel.create({
  name: 'associateinfo',
  type: 'associateinfo',

},model);

storiesOf('通用', module)
  .add('Toolbar', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><Toolbar config={toolbar}/></TemplateProvider>)
    .add('Total', () => <TemplateProvider
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><Total config={total}/></TemplateProvider>)
      .add('AssociateInfo', () => <TemplateProvider
        onEvent={(name,args)=>action(name)(args)}
        onAction={(name,args)=>action(name)(args)}><AssociateInfo config={associateinfo}/></TemplateProvider>)
