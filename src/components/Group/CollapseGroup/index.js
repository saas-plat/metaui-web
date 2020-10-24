import React from 'react';
import {
  Icon,
  Collapse,
} from 'antd';
import "./style";
const style = require("!less-to-json-loader!../../style/vars.less");
import {UIComponent} from '@saas-plat/metaui';

const Panel = Collapse.Panel;

export default class CollapseGroup extends UIComponent {

  render() {
    const {
      activeKey,
      items
    } = this.props.config;
    if (items.length == 1) {
      return this.renderItem(items[0]);
    }
    return (<Collapse className={`${style.prefix}-groups collapse`} bordered={false} defaultActiveKey={activeKey}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
      {items.map((it,i)=><Panel header={it.text || (this.props.t('分组')+(i+1))} key={it.key} className='item'>
        <div className='panel'>
          {this.renderItem(it)}
        </div>
      </Panel>)}
    </Collapse>)
  }
}
