import React from 'react';
import InputItem from './InputItem';
import EditableTable from './EditableTable';
import moment from 'moment';
import _isDate from 'lodash/isDate';

export const createComponent = (config, options) => {
  if (config.type === 'table') {
    return <EditableTable config={config} {...options}/>;
  }
  return <InputItem config={config} {...options}/>;
}

const noformatter = value => value;
const noparser = value => value;

export const createFormatter = ({
  format = '',
  precision
}) => {
  let formatter, parser;
  formatter = noformatter;
  parser = noparser;

  if (format.toLowerCase() === 'thousandth') {
    formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    parser = value => Math.round(Number(value.replace(/(,*)/g, '')).toFixed(precision));
  }
  if (format.toLowerCase() === 'percentage') {
    formatter = value => `${Math.round(Number(value*100).toFixed(precision-2))}%`;
    parser = value => Math.round(Number(value.replace('%', '') * 100).toFixed(precision));
  }
  if (format.toLowerCase() === 'date') {
    formatter = value => moment(value).format('yyyy-MM-dd');
    parser = value => moment(value, format).toDate();
  }
  if (format.toLowerCase() === 'time') {
    formatter = value => moment(value).format('HH:mm:ss');
    parser = value => moment(value, 'HH:mm:ss').toDate();
  }
  if (format.toLowerCase() === 'datetime') {
    formatter = value => moment(value).format('YYYY-MM-DD HH:mm:ss');
    parser = value => moment(value, 'YYYY-MM-DD HH:mm:ss').toDate();
  }

  return {
    formatter,
    parser
  };
}

export const renderElement = (value, formatter) => {
  if (value === undefined || value === null) {
    return null;
  }
  if (formatter !== noformatter) {
    value = formatter(value);
  } else if (_isDate(value)) {
    value = moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
  return value.toString()
}

export const renderColumns = (columns) => {
  return columns.map(it => {
    return {
      ...it,
      // 需要toString要不react报错
      render: value => renderElement(value, createFormatter(it).formatter),
      children: it.children ? renderColumns(it.children) : null
    }
  })
}
