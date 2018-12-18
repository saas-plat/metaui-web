import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import {
  Input,
  Checkbox,
  Switch,
  DatePicker,
  InputNumber,
  TimePicker,
  TreeSelect,
  Select
} from 'antd';
import './style';
import RcRefSelect from 'rc-ref-select';
import BaseComponent from '../BaseComponent';
import InputTable from '../InputTable';
import moment from 'moment';
import _set from 'lodash/set';

const TextArea = Input.TextArea;
const {
  MonthPicker,
  RangePicker,
  WeekPicker
} = DatePicker;

@observer
export default class InputItem extends BaseComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    autoFocus: PropTypes.bool,
    state: PropTypes.string,
    // for form item
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  handleChange = (value) => {
    this.props.onChange && this.props.onChange(value);
  }

  setValue = async ({
    value
  }) => {
    //debugger
    const setField = this.props.config.setValue || this.props.config.value;
    if (setField) {
      _set(this.props.config.store.model, setField, value);
    // } else {
    //   console.log('setValue field not found, skip setValue');
    }
  }

  renderInput(config) {
    const {
      key,
      value,
      defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    return (<Input id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      placeholder={placeholder} defaultValue={defaultValue}
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      value={value}
      onChange={(e)=>{this.context.onEvent(config, 'change', {value:e.target.value}, this.setValue),this.handleChange(e.target.value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}/>);
  }

  renderInputNumber(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      min,
      max,
      format,
      size
    } = config;
    let formatter, parser;

    if (format.toLowerCase() === 'thousandth') {
      formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      parser = value => value.replace(/\$(,*)/g, '');
    }
    if (format.toLowerCase() === 'percentage') {
      formatter = value => `${value}%`;
      parser = value => value.replace('%', '');
    }

    return <InputNumber
        id={key}
        autoFocus={this.props.autoFocus}
        size={size}
        className='input'
        value={value}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        min={min}
        max={max}
        formatter={formatter}
        parser={parser}
        onChange={(value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(config, 'blur')}
        onFocus={()=>this.context.onEvent(config, 'focus')}
      />
  }

  renderTextArea(config) {
    const {
      key,
      value,
      defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    let autosize = true;
    if (size === 'large') {
      autosize = {
        minRows: 10
      };
    }
    if (size === 'small') {
      autosize = {
        minRows: 1
      };
    }
    if (typeof (size) === 'number') {
      // 支持自定义行数
      autosize = {
        minRows: parseInt(size)
      };
    }
    return <TextArea id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      placeholder={placeholder} defaultValue={defaultValue} disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      value={value}
      onChange={(value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      autosize={autosize} />
  }

  renderDatePicker(config) {
    const {
      key,
      type,
      value,
      clear,
      format,
      defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    let Component;
    let showTime = false;
    switch (type) {
    case 'date':
      Component = DatePicker;
      break;
    case 'datetime':
      showTime = true;
      Component = DatePicker;
      break;
    case 'month':
      Component = MonthPicker;
      break;
    case 'daterange':
      Component = RangePicker;
      break;
    case 'week':
      Component = WeekPicker;
      break;
    default:
      showTime = true;
      Component = DatePicker;
      break;
    }
    return <Component id={key}
    autoFocus={this.props.autoFocus}
    size={size}
    className='input'
    allowClear={clear} showTime={showTime} disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
    placeholder={placeholder} defaultValue={defaultValue}
    value={moment(value,format)}
    format={format}
    onChange={(moment,value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
    onBlur={()=>this.context.onEvent(config, 'blur')}
    onFocus={()=>this.context.onEvent(config, 'focus')}/>
  }

  renderTimePicker(config) {
    const {
      key,
      value,
      clear,
      format,
      defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    return <TimePicker  id={key}
    autoFocus={this.props.autoFocus}
    size={size}
    className='input'
    allowEmpty={clear}  disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
    placeholder={placeholder} defaultValue={defaultValue}
    value={moment(value,format)}
    format={format}
    onChange={(value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
    onBlur={()=>this.context.onEvent(config, 'blur')}
    onFocus={()=>this.context.onEvent(config, 'focus')}/>
  }

  renderCheckBox(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      size
    } = config;
    return <Checkbox id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      checked={!!value} defaultChecked={!!defaultValue}
      onChange={(value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      ></Checkbox>
  }

  renderSwitch(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      size
    } = config;
    return <Switch id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      checked={!!value} defaultChecked={!!defaultValue}
      onChange={(value)=>{this.context.onEvent(config, 'change', {value}, this.setValue),this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      ></Switch>
  }

  renderSelect(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      format,
      size
    } = config;
    const formatter = (value) => {
      // todo format
      return value;
    }
    const val = (value || []).slice();
    return <Select
      id={key}
      className='input'
      autoFocus={this.props.autoFocus}
      size={size}
      showSearch
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      value={val}
      defaultValue={defaultValue}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={(value)=>{this.context.onEvent(this.props.config, 'change', {value}, this.setValue),this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
      onFocus={()=>this.context.onEvent(this.props.config, 'focus')}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
      <Select.Option value="jack">Jack</Select.Option>
      <Select.Option value="lucy">Lucy</Select.Option>
      <Select.Option value="tom">Tom</Select.Option>
    </Select>
  }

  renderTreeSelect(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      format,
      size
    } = config;
    const formatter = (value) => {
      // todo format
      return value;
    }
    const val = (value || []).slice();
    return <TreeSelect id={key}
        autoFocus={this.props.autoFocus}
        size={size}
        className='input'
        value={val}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        onChange={(value)=>{this.context.onEvent(this.props.config, 'change', {value}, this.setValue),this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}
        />
  }

  renderRefSelect(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      format,
      size
    } = config;
    const formatter = (value) => {
      // todo format
      return value;
    }
    let val = (value || []).slice();
    if (!Array.isArray(val)) {
      val = [val];
    }
    val = val.map(it => it.toString());
    return <RcRefSelect id={key}
        className='input'
        prefixCls='ant-select'
        autoFocus={this.props.autoFocus}
        value={val}
        size={size}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        formatter={formatter}
        onChange={(value)=>{this.context.onEvent(this.props.config, 'change', {value}, this.setValue),this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}
        />
  }

  renderInputTable(config) {
    return <InputTable config={config} disabled={this.props.readonlyMode === 'disable'?config.state === 'READONLY':false} autoFocus={this.props.autoFocus} onChange={this.handleChange}/>
  }

  renderText(config) {
    return <span className='text'>{config.value}</span>;
  }

  render() {
    const {
      config,
      readonlyMode = 'text'
    } = this.props;
    let element;
    if (config.state === 'READONLY' && readonlyMode !== 'disable') {
      element = this.renderText(config);
    } else {
      switch (config.type) {
      case 'text':
      case 'textbox':
      case 'input':
        element = this.renderInput(config);
        break;
      case 'textarea':
        element = this.renderTextArea(config);
        break;
      case 'number':
        element = this.renderInputNumber(config);
        break;
      case 'check':
      case 'checkbox':
        element = this.renderCheckBox(config);
        break;
      case 'switch':
        element = this.renderSwitch(config);
        break;
      case 'date':
      case 'datetime':
      case 'month':
      case 'daterange':
      case 'week':
        element = this.renderDatePicker(config);
        break;
      case 'time':
        element = this.renderTimePicker(config);
        break;
      case 'select':
      case 'listselect':
        element = this.renderSelect(config);
        break;
      case 'treeselect':
        element = this.renderTreeSelect(config);
        break;
      case 'refselect':
      case 'treetableselect':
        element = this.renderRefSelect(config);
        break;
      case 'table':
      case 'inputtable':
        element = this.renderInputTable(config);
        break;
      default:
        //warn('not support input type ' + config.type);
        element = <span className='notsupport'></span>;
      }
    }
    return (<div className={'inputitem '+config.type} style={{width:config.width}}>
      {element}
    </div>);
  }
}
