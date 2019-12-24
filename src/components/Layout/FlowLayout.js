import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import './style';

@observer
export default class FlowLayout extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    width: PropTypes.string,
    renderItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      key,
      items = [],
      layout,
      itemWidth = this.props.width || 'auto'
    } = this.props.config;
    let hasFocus = false;
    let its = items.slice();
    if (layout === 'right') {
      its.reverse();
    }
    let style;
    if (itemWidth && itemWidth !== 'auto') {
      style = {
        width: itemWidth
      }
    }
    return (<div className={['layout','flow', layout].join(' ')}>
      {its.map(it=>{
        // 自动选中第一个不是禁用的input
        let autoFocus = false;
        if (this.props.autoFocus && !it.disabled && !hasFocus)
          {
            autoFocus = true;
            hasFocus = true;
          }
        return <div key={'FlowItem'+key+it.key} className='item' style={style}>
          {this.props.renderItem(it,{autoFocus}, items)}
        </div>}
      )}
    </div>);
  }
}
