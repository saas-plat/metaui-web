import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'antd';
import './style';

@observer
export default class GridLayout extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    renderItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      key,
      items,
      columnCount
    } = this.props.config;
    let hasFocus = false;
    const rows = [];
    const span = parseInt(24/columnCount);
    const column = parseInt(24/span);
    for (let i = 0, l = items.length; i < l; i += column) {
      const cols = [];
      for (let j = 0; j < column && i + j < l; j++) {
        const it = items[i + j];
        // 自动选中第一个不是禁用的input
        let autoFocus = false;
        if (this.props.autoFocus && !it.disabled && !hasFocus) {
          autoFocus = true;
          hasFocus = true;
        }
        cols.push(<Col key={'Col'+key+it.key} span={span} className='item'>{this.props.renderItem(it,{autoFocus}, items)}</Col>);
      }
      rows.push(<Row key={'Row'+key+i} className='row'>{cols}</Row>);
    }
    return (<div className={['layout','grid'].join(' ')}>
      {rows}
    </div>);
  }
}
