import moment from 'moment';
import _isDate from 'lodash/isDate';

const noformatter = value => value;
const noparser = value => value;

export const createFormatter = ({
  format = '',
  precision
}) => {
  let formatter, parser;
  formatter = noformatter;
  parser = noparser;
  format = format.toLowerCase();

  if (format === 'thousandth') {
    formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    parser = value => Math.round(Number(value.replace(/(,*)/g, '')).toFixed(precision));
  }
  if (format === 'percentage') {
    formatter = value => `${Math.round(Number(value*100).toFixed(precision-2))}%`;
    parser = value => Math.round(Number(value.replace('%', '') * 100).toFixed(precision));
  }
  if (format === 'date') {
    formatter = value => moment(value).format('yyyy-MM-dd');
    parser = value => moment(value, format).toDate();
  }
  if (format === 'time') {
    formatter = value => moment(value).format('HH:mm:ss');
    parser = value => moment(value, 'HH:mm:ss').toDate();
  }
  if (format === 'datetime') {
    formatter = value => moment(value).format('YYYY-MM-DD HH:mm:ss');
    parser = value => moment(value, 'YYYY-MM-DD HH:mm:ss').toDate();
  }
  if (format === 'intstring') {
    formatter = value => value.toString().replace(/[^0-9]/ig, '');
    parser = value => value;
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
