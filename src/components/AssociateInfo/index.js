import React from 'react';
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';
import './style';

@observer
export class AssociateInfo extends React.Component {
  static propTypes = {}

  state = {

  };

  render() {
    return (<div className='associateInfo'>
      AssociateInfo
    </div>);
  }
}
