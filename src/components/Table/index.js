import React from 'react';
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import {UIComponent} from 'saas-plat-metaui';
import './style';

@observer
export default class Table extends UIComponent {
  static propTypes = {}

  state = {

  };

  render() {
    return (<div className='associateInfo'>
      AssociateInfo
    </div>);
  }
}
