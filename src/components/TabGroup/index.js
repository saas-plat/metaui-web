import React from 'react';
import {
  Tabs,
} from 'antd';
import './style';
import {UIComponent} from 'saas-plat-metaui';

const TabPane = Tabs.TabPane;

export default class TabGroup extends UIComponent {

  render() {
    const {
      key,
      items
    } = this.props.config;
    if (items.length == 1) {
      return this.renderItem(items[0]);
    }
    return <Tabs type="card" className='tabs' key={key}>
      {items.map(it=>(
        <TabPane tab={it.text} key={it.key}>
          {this.renderItem(it)}
        </TabPane>))}
    </Tabs>
  }
}
