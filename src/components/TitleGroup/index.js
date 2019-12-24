import React from 'react';
import {
  Collapse,
} from 'antd';
import './style';
import {UIComponent} from 'saas-plat-metaui';

const Panel = Collapse.Panel;

export default class TitleGroup extends UIComponent {

  render() {
    const {
      activeKey,
      items
    } = this.props.config;
    if (items.length == 1) {
      return this.renderItem(items[0]);
    }
    return (<Collapse className="groups" bordered={false} defaultActiveKey={activeKey}>
      {items.map(it=><Panel className="group" header={it.text} key={it.key}>
        {this.renderItem(it)}
      </Panel>:null)}
    </Collapse>)
  }
}
