import React from 'react';
import {
  storiesOf
} from '@storybook/react';
import {
  action
} from '@storybook/addon-actions';
import {
  UIContainer,
  MetaUI,
  UIRender
} from '@saas-plat/metaui';
import {
  View
} from '@saas-plat/metaschema';
import {
  observable
} from "mobx";
import dataAddon from '../.storybook/data/dataAddon';
import '../src';

const data = observable({
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
});

const groups = MetaUI.create(View({
  type: 'group',
  items: [{
    type: 'view',
    items: [{
      type: 'text',
      value: '$code',
      setValue: 'code',
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
  }]
}), data).ui

const tabs = MetaUI.create(View({
  type: 'group',
  layout: 'tab',
  items: [{
    type: 'view',
    text: 'view1',
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
    text: 'view2',
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
  }]
}), data).ui

const collapses = MetaUI.create(View({
  type: 'group',
  layout: 'collapse',
  items: [{
    type: 'view',
    text: 'view1',
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
    text: 'view2',
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
  }]
}), data).ui

const flow = MetaUI.create(View({
  type: 'view',
  layout: 'left',
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
    type: 'date',
    value: '$obj2.f2',
    label: 'f2',
  }, {
    type: 'text',
    value: '$obj2.f3',
    label: 'f3',
  }]
}), data).ui

const list = MetaUI.create(View({
  type: 'view',
  layout: 'list',
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
}), data).ui

const grid = MetaUI.create(View({
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
}), data).ui

const topbottom = MetaUI.create(View({
  type: 'view',
  layout: 'topbottom',
  items: [{
    name: 'toolbar',
    type: 'toolbar',
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
}), data).ui

const sidercontent = MetaUI.create(View({
  type: 'view',
  layout: 'sidercontent',
  items: [{
    name: 'toolbar',
    type: 'toolbar',
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
    },{
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
}), data).ui

storiesOf('布局类', module)
  .addParameters({
    data
  })
.addDecorator(dataAddon)
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
          <hr/>
          <UIRender ui={sidercontent}/>
        </UIContainer>)

  .add('GroupLayout', () => <UIContainer
            onEvent={(name,args)=>action(name)(args)}
            onAction={(name,args)=>action(name)(args)}>
              <UIRender ui={groups}/><hr/>
              <UIRender ui={tabs}/><hr/>
              <UIRender ui={collapses}/>
            </UIContainer>)
