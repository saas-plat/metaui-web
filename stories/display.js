import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import ViewModel from '../src/viewmodel';
import TemplateProvider from '../src/components/TemplateProvider';
import TreeTable from '../src/components/TreeTable';
import Chart from '../src/components/Chart';
import Total from '../src/components/Total';
import AssociateInfo from '../src/components/AssociateInfo';

const model = {}

const total = ViewModel.create({
  name: 'total',
  type: 'total',

}, model);

const associateinfo = ViewModel.create({
  name: 'associateinfo',
  type: 'associateinfo',

}, model);

const table = ViewModel.create({
  type: 'table',

}, model);

const treetable = ViewModel.create({
  type: 'treetable',

}, model);

const chart = ViewModel.create({
  type: 'bar',

}, model);

storiesOf('数据展示', module)
  .add('Table', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><TreeTable config={table}/></TemplateProvider>)
  .add('TreeTable', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><TreeTable config={treetable}/></TemplateProvider>)
  .add('Chart', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><Chart config={chart}/></TemplateProvider>)
  .add('Total', () => <TemplateProvider
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}><Total config={total}/></TemplateProvider>)
  .add('AssociateInfo', () => <TemplateProvider
        onEvent={(name,args)=>action(name)(args)}
        onAction={(name,args)=>action(name)(args)}><AssociateInfo config={associateinfo}/></TemplateProvider>)
