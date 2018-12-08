import React from 'react';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component{
  static propTypes = {
    config: PropTypes.object.isRequired,
  }

  static contextTypes = {
    model: PropTypes.object.isRequired,
    onEvent: PropTypes.func.isRequired,
  }

  state = {}

}
