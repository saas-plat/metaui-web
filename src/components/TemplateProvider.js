import React from 'react';
import PropTypes from 'prop-types';
import translater from '../translater';

const none = () => {}

export default class TemplateProvider extends React.Component {
  static propTypes = {
    onEvent: PropTypes.func,
    t: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    onEvent: () => {},
    t: translater.t
  }

  static childContextTypes = {
    onEvent: PropTypes.func,
    t: PropTypes.func,
  }

  handleEvent = (target, event, args, defaultAction = none) => {
    if (this.props.onEvent) {
      this.props.onEvent(target, event, args);
    } else {
      defaultAction();
    }
  }

  getChildContext() {
    return {
      onEvent: this.handleEvent,
      t: this.props.t,
    };
  }

  render() {
    return this.props.children;
  }
}
