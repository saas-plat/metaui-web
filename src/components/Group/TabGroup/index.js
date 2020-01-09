import React from 'react';
import {
  Tabs,
} from 'antd';
import './style';
import {UIComponent} from 'saas-plat-metaui';
import {TextAndIcon} from '../../Toolbar';

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
    return <Tabs type="card" className='groups tabs' key={key}>
      {items.map(it=>(
        <TabPane tab={<TextAndIcon config={it}/>} key={it.key} className='panel'>
          {this.renderItem(it)}
        </TabPane>))}
    </Tabs>
  }
}
