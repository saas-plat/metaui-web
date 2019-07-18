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
  Select,
} from 'antd';
import './style';
import RcRefSelect from 'rc-ref-select';
import BaseComponent from '../BaseComponent';
import InputTable from '../InputTable';
import moment from 'moment';

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

  state = {
    data: [],
    fetching: false,
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      this.setState({
        data: [],
        fetching: false,
      });
      this.props.onChange(value);
    } else {
      this.context.onEvent(this.props.config, 'change', {
        value
      }, this.setValue);
    }
  }

  setValue = async ({
    value
  }) => {
    this.props.config.value = value;
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
      value={'value' in this.props?this.props.value:value}
      onChange={(e)=>{this.handleChange(e.target.value)}}
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
      formatter = value => `${'value' in this.props?this.props.value:value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      parser = value => value.replace(/\$(,*)/g, '');
    }
    if (format.toLowerCase() === 'percentage') {
      formatter = value => `${'value' in this.props?this.props.value:value}%`;
      parser = value => value.replace('%', '');
    }

    return <InputNumber
        id={key}
        autoFocus={this.props.autoFocus}
        size={size}
        className='input'
        value={'value' in this.props?this.props.value:value}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        min={min}
        max={max}
        formatter={formatter}
        parser={parser}
        onChange={(value)=>{this.handleChange(value)}}
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
      value={'value' in this.props?this.props.value:value}
      onChange={(value)=>{this.handleChange(value)}}
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
    onChange={(moment,value)=>{this.handleChange(value)}}
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
    onChange={(value)=>{this.handleChange(value)}}
    onBlur={()=>this.context.onEvent(config, 'blur')}
    onFocus={()=>this.context.onEvent(config, 'focus')}/>
  }

  renderCheckBox(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      text,
      size
    } = config;
    return <Checkbox id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      checked={!!value} defaultChecked={!!defaultValue}
      onChange={(e)=>{this.handleChange( {value:e.target.checked}, this.setValue),this.handleChange(e.target.checked)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      >{text}</Checkbox>
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
      onChange={(value)=>{this.handleChange(value)}}
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
      placeholder,
      size,
      mode,
      dataSource,
    } = config;
    return <Select
      id={key}
      className='input'
      autoFocus={this.props.autoFocus}
      size={size}
      showSearch
      mode={mode}
      disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
      value={'value' in this.props?this.props.value:value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={(value)=>{this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
      onFocus={()=>this.context.onEvent(this.props.config, 'focus')}>
      {dataSource.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>)}
    </Select>
  }

  renderTreeSelect(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      placeholder,
      size,

      dataSource,
      showSearch = false,
      allowClear = true,
      multiple = false,
      treeCheckable = false,
      treeDefaultExpandAll = true,
      maxHeight = 400
    } = config;
    return <TreeSelect id={key}
        autoFocus={this.props.autoFocus}
        size={size}
        allowClear={allowClear}
        showSearch={showSearch}
        filterTreeNode={(input, node) => node.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        placeholder={placeholder}
        multiple={multiple}
        treeCheckable={treeCheckable}
        treeDefaultExpandAll={treeDefaultExpandAll}
        dropdownStyle={{ maxHeight: maxHeight, overflow: 'auto' }}
        className='input'
        treeData={dataSource}
        value={'value' in this.props?this.props.value:value}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        onChange={(value)=>{this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}>
        </TreeSelect>
  }

  renderRefSelect(config) {
    const {
      key,
      value,
      defaultValue,
      disabled,
      size,

      dataSource,
      showHeader = true,
      showSearch = true,
      allowClear = true,
      multiple = false,
      defaultExpandAll = false,
      defaultExpandKeys = [],
      columns,
    } = config;
    let val;
    if (!value || !Array.isArray(value.slice())) {
      val = value ? [value] : [];
    } else {
      val = value.slice();
    }
    val = val.map(it => ({
      value: it.toString()
    }));
    // labelInValue 用于格式化显示
    return <RcRefSelect id={key}
        className='input'
        prefixCls='ant-select'
        autoFocus={this.props.autoFocus}
        labelInValue={true}
        allowClear={allowClear}
        showSearch={showSearch}
        multiple={multiple}
        dataSource={dataSource}
        defaultExpandAll={defaultExpandAll}
        defaultExpandKeys={defaultExpandKeys}
        showHeader={showHeader}
        columns={columns}
        value={val}
        size={size}
        defaultValue={defaultValue}
        disabled={disabled || (this.props.readonlyMode === 'disable'?config.state === 'READONLY':false)}
        onChange={(value)=>{this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}/>
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
