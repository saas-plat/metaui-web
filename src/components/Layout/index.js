import React from 'react';
import {
  observer
} from "mobx-react";
import {
  UIComponent
} from 'saas-plat-metaui';
import FlowLayout from './FlowLayout';
import GridLayout from './GridLayout';

@observer
export default class Layout extends UIComponent {
  render() {
    const {
      config
    } = this.props;
    if (config.layout === 'left' || config.layout === 'right') {
      return <FlowLayout config={config} renderItem={this.renderItem}/>;
    }
    return <GridLayout config={config} renderItem={this.renderItem}/>;
  }
}
