import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import {UIContainer,ViewStore} from 'saas-plat-metaui';
import Chart from '../src/components/Chart'; 
import Table from '../src/components/Table';

const model = {}



const table = ViewStore.create({
  name: 'table',
  type: 'table',

}, model);




const chart = ViewStore.create({
  type: 'bar',

}, model);

storiesOf('数据展示', module)
  .add('Table', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><Table config={table}/></UIContainer>)

  .add('Chart', () => <UIContainer
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}><Chart config={chart}/></UIContainer>)
