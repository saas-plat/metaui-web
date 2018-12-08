import React from 'react';
import PropTypes from 'prop-types';

export default class TemplateProvider extends React.Component {
  static propTypes = {
    model: PropTypes.object,
    onEvent: PropTypes.func,
    t: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    model: {},
    onEvent: () => {}
  }

  static childContextTypes = {
    model: PropTypes.object,
    onEvent: PropTypes.func,
    t: PropTypes.func,
  }

  getChildContext() {
    return {
      onEvent: this.props.onEvent,
      model: this.props.model,
      t: this.props.t,
    };
  }

  render() {
    return this.props.children;
  }
}
