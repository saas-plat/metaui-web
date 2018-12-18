import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import ViewModel from '../src/viewmodel';
import TemplateProvider from '../src/components/TemplateProvider';

storiesOf('数据展示', module)
  .add('Chart', () => <TemplateProvider
    onEvent={(name,args)=>action(name)(args)}
    onAction={(name,args)=>action(name)(args)}> </TemplateProvider>)
  .add('Table', () => <TemplateProvider
      onEvent={(name,args)=>action(name)(args)}
      onAction={(name,args)=>action(name)(args)}> </TemplateProvider>)
