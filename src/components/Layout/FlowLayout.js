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
    renderItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      key,
      items,
      state,
      itemWidth
    } = this.props.config;
    let hasFocus = false;
    return (<div className={['layout','flow',state].join(' ')}>
      {items.filter(it=>it.visible).map(it=>{
        // 自动选中第一个不是禁用的input
        let autoFocus = false;
        if (this.props.autoFocus && !it.disabled && !hasFocus)
          {
            autoFocus = true;
            hasFocus = true;
          }
        return <div key={'FlowItem'+key+it.key} className='item' style={{width:it.width || itemWidth}}>
          {this.props.renderItem(it,{autoFocus}, items)}
        </div>}
      )}
    </div>);
  }
}
