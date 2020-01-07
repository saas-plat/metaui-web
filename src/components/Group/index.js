import React from 'react';
import {
  observer
} from "mobx-react";
import {
  UIComponent
} from 'saas-plat-metaui';
import CollapseGroup from './CollapseGroup';
import TabGroup from './TabGroup';
import TitleGroup from './TitleGroup';

@observer
export default class Group extends UIComponent {
  render() {
    const {
      config
    } = this.props;
    if (config.layout === 'collapse') {
      return <CollapseGroup {...this.props} t={this.context.t} renderItem={this.renderItem}/>;
    } else if (config.layout === 'tab') {
      return <TabGroup {...this.props} t={this.context.t} renderItem={this.renderItem}/>;
    } else {
      return <TitleGroup {...this.props} t={this.context.t} renderItem={this.renderItem}/>;
    }
  }
}
