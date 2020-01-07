import React from 'react';
import PropTypes from 'prop-types';
import './style';

export default class TitleGroup extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    renderItem: PropTypes.func,
    t: PropTypes.func,
  }

  render() {
    const {
      title = this.props.t('分组'),
      items
    } = this.props.config;
    if (items.length == 1) {
      return this.renderItem(items[0]);
    }
    return (<div className="groups title">
        <h3>{title}</h3>
        {items.map(this.props.renderItem)}
      </div>)
  }
}
