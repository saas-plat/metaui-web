import React from 'react';
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import BaseComponent from '../BaseComponent';
import './style';

@observer
export class AssociateInfo extends BaseComponent {
  static propTypes = {}

  state = {

  };

  render() {
    return (<div className='associateInfo'>
      AssociateInfo
    </div>);
  }
}
