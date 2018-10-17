import React from 'react';
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {Checkbox,Row,Col} from 'antd';
import './style';

@observer
export class Total extends React.Component {
  static propTypes = {
    config: PropTypes.object
  }

  state = {};

  render() {
    return (<Row className='total'>
      <Col span={24} style={{
        textAlign: 'right'
      }}>总计：xxxx</Col>
    </Row>);
  }
}
