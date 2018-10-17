import React from 'react';
import InputItem from './InputItem';
import EditableTable from './EditableTable';

export const createComponent = (config, options) => {
  if (config.type === 'table'){
    return <EditableTable config={config} {...options}/>;
  }
  return <InputItem config={config} {...options}/>;
}
