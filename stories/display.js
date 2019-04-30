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

const model = {}

const table = ViewModel.create({
  type: 'table',

},model);

const treetable = ViewModel.create({
  type: 'treetable',

},model);

const chart = ViewModel.create({
  type: 'bar',

},model);

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
