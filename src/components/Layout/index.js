import React from 'react';
import {
  observer
} from "mobx-react";
import {
  UIComponent
} from 'saas-plat-metaui';
import ListLayout from './ListLayout';
import FlowLayout from './FlowLayout';
import GridLayout from './GridLayout';
import PortalLayout from './PortalLayout';

@observer
export default class Layout extends UIComponent {
  render() {
    const {
      config
    } = this.props;
    if (config.layout === 'left' || config.layout === 'right') {
      return <FlowLayout config={config} renderItem={this.renderItem}/>;
    } else if (config.layout === 'topbottom' || config.layout === 'sidercontent' || config.layout === 'contentsider' || config.layout === 'sidertopbottom') {
      return <PortalLayout config={config} renderItem={this.renderItem}/>;
    } else if (config.layout === 'list') {
      return <ListLayout config={config} renderItem={this.renderItem}/>;
    } else {
      return <GridLayout config={config} renderItem={this.renderItem}/>;
    }
  }
}
