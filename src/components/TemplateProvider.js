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
    onAction: PropTypes.func,
    t: PropTypes.func,
  }

  _setValue = async (target, {
    value
  }) => {
    const setField = target.setValue || target.value;
    if (setField) {
      this.props.model.set(setField, value);
    } else {
      console.log('setValue field not found, skip setValue');
    }
  }

  handleEvent = (target, event, args) => {
    const action = target['on' + event[0].toUpperCase() + event.substr(1)];
    const handler = this['_' + action.name];
    if (handler) {
      handler(target, args);
    }
    if (this.props.onEvent) {
      this.props.onEvent(target, event, args);
    }
  }

  getChildContext() {
    return {
      onEvent: this.handleEvent,
      model: this.props.model,
      t: this.props.t,
    };
  }

  render() {
    return this.props.children;
  }
}
