import React from 'react';
import PropTypes from 'prop-types';

export default class ViewWarpper extends React.Component {

  static propTypes = {
    onEvent: PropTypes.func.isRequired,
    mid: PropTypes.string.isRequired,
    orgid: PropTypes.string.isRequired,
    id: PropTypes.string,
    code: PropTypes.string,
    view: PropTypes.object,
    viewModel: PropTypes.object,
    store: PropTypes.object,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    onEvent: PropTypes.func,
    orgid: PropTypes.string,
    mid: PropTypes.string,
    id: PropTypes.string,
    code: PropTypes.string,
    view: PropTypes.object,
    viewModel: PropTypes.object,
    store: PropTypes.object,
  }

  getChildContext() {
    return {
      mid: this.props.mid,
      id: this.props.id,
      code: this.props.code,
      orgid: this.props.orgid,
      onEvent: this.props.onEvent,
      view: this.props.view,
      viewModel: this.props.viewModel,
      store: this.props.store
    };
  }

  componentWillMount() {
    const {
      view,
    } = this.props;
    this.props.onEvent(view, 'load');
  }

  componentWillReceived(nextProps) {
    const {
      code
    } = this.props;
    const {
      view
    } = nextProps;
    if (code !== nextProps.code) {
      this.nextProps.onEvent(view, 'load');
    }
  }

  render(){
    return this.props.children;
  }
}
