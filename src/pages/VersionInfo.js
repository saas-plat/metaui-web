import React from 'react';
import pkg from '../../package.json';

export default class VersionInfo extends React.Component {
  render() {
    return (<div>
        <p>{pkg.name}</p>
        <p>{pkg.version}</p>
      </div>)
  }
}
