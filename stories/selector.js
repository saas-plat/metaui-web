// 选择不等同于输入，需要弹出一个复杂的界面，关闭后输入
import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import ViewModel from '../src/viewmodel';
import TemplateProvider  from '../src/components/TemplateProvider';

const model = {}



storiesOf('选择', module)
