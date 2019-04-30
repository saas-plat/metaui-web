import React from 'react';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component{
  static propTypes = {
    config: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }

  static contextTypes = {
    onEvent: PropTypes.func.isRequired,
  }

  state = {}

}
