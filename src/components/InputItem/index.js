import React from 'react';
import {
  observer
} from 'mobx-react';
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
  Icon
} from 'antd';
import './style';
import RcRefSelect from 'rc-ref-select';
import {
  UIComponent
} from 'saas-plat-metaui';
import InputTable from '../InputTable';
import {ToolButtons} from '../Toolbar';
import moment from 'moment';
import {
  renderColumns,
  createFormater
} from '../util';

const TextArea = Input.TextArea;
const {
  MonthPicker,
  RangePicker,
  WeekPicker
} = DatePicker;

@observer
export default class InputItem extends UIComponent {
  static propTypes = {
    ...UIComponent.propTypes,
    autoFocus: PropTypes.bool,
    state: PropTypes.string,
    // for form item
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  state = {
    data: [],
    fetching: false,
    focus: false
  }

  handleChange = (value) => {
    const {
      maxLength = 255
    } = this.props.config;
    if (value && value.toString().length > maxLength) {
      return;
    }
    if (this.props.onChange) {
      this.setState({
        data: [],
        fetching: false,
      });
      this.props.onChange(value);
    }
    this.context.onEvent(this.props.config, 'change', {
      value
    }, this.setValue);
  }

  handleBlur = () => {
    this.setState({
      focus: false
    })
    this.context.onEvent(this.props.config, 'blur');
  }

  handleFocus = () => {
    this.setState({
      focus: true
    })
    this.context.onEvent(this.props.config, 'focus');
  }

  setValue = async ({
    value
  }) => {
    this.props.config.value = value;
  }

  formatTitle = ({
    title,
    maxLength = 255,
    precision
  }) => {
    if (!title) {
      if (maxLength) {
        if (precision) {
          title = this.t('整数{{integer}}位, 小数{{precision}}位', {
            integer: maxLength - precision - 1,
            precision
          });
        } else {
          title = this.t('最大长度{{maxLength}}位', {
            maxLength
          });
        }
      }
    }
    return title;
  }

  checkInt = (txt) => {
    // 保证可以清空
    return !txt || txt.match(/^\d+$/) !== null;
  }

  renderInput(config) {
    let {
      key,
      value,
      //defaultValue,
      placeholder,
      disabled,
      size,
      format
    } = config;
    value = 'value' in this.props ? this.props.value : value;
    return (<Input id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      placeholder={placeholder}
      //defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      title={this.formatTitle(config)}
      onChange={(e)=>{
        let val = e.target.value;
        // 只能输入0-9和空格
        if (format === 'intstring' && ! this.checkInt(val)){
           return
        }
        this.handleChange(val)
      }}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}/>);
  }

  renderInputNumber(config) {
    let {
      key,
      value,
      //defaultValue,
      disabled,
      min,
      max,
      size,
      precision = 2,
      maxLength = 255,
    } = config;
    value = 'value' in this.props ? this.props.value : value;
    let formatter, parser;

    if (!this.state.focus) {
      const format = createFormater(config);
      formatter = format.formatter;
      parser = format.parser;
    }
    return <InputNumber
        id={key}
        title={this.formatTitle({...config,maxLength,precision})}
        autoFocus={this.props.autoFocus}
        size={size}
        className='input'
        value={value}
        //defaultValue={defaultValue}
        disabled={disabled}
        min={min}
        max={max}
        formatter={formatter}
        parser={parser}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
  }

  renderTextArea(config) {
    let {
      key,
      value,
      //defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    let autoSize = true;
    value = 'value' in this.props ? this.props.value : value;
    if (size === 'large') {
      autoSize = {
        minRows: 10
      };
    }
    if (size === 'small') {
      autoSize = {
        minRows: 1
      };
    }
    if (typeof (size) === 'number') {
      // 支持自定义行数
      autoSize = {
        minRows: parseInt(size)
      };
    }
    return <TextArea id={key}
      autoFocus={this.props.autoFocus}
      size={size}
      className='input'
      title={this.formatTitle(config)}
      placeholder={placeholder}
      //defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onChange={(e)=>{this.handleChange(e.target.value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      autoSize ={autoSize } />
  }

  renderDatePicker(config) {
    let {
      key,
      type,
      value,
      clear,
      format,
      showTime = false,
      //defaultValue,
      placeholder,
      defaultPickerValue,
      disabled,
      showToday = true,
      size,
      mode, // time|date|month|year|decade
    } = config;
    let Component;
    if (Array.isArray(value)) {
      value = value.map(it => moment(it));
    } else {
      value = value ? moment(value) : value;
    }
    // if (Array.isArray(defaultValue)) {
    //   defaultValue = defaultValue.map(it => moment(it));
    // } else {
    //   defaultValue = defaultValue ? moment(defaultValue) : defaultValue;
    // }
    if (Array.isArray(defaultPickerValue)) {
      defaultPickerValue = defaultPickerValue.map(it => moment(it));
    } else {
      defaultPickerValue = defaultPickerValue ? moment(defaultPickerValue) : defaultPickerValue;
    }
    switch (type) {
    case 'date':
      format = format || 'YYYY-MM-DD';
      Component = DatePicker;
      break;
    case 'datetime':
      showTime = showTime || {
        format: 'HH:mm:ss'
      };
      format = format || 'YYYY-MM-DD HH:mm:ss';
      Component = DatePicker;
      break;
    case 'month':
      format = format || 'YYYY-MM';
      Component = MonthPicker;
      break;
    case 'daterange':
      format = format || 'YYYY-MM-DD';
      Component = RangePicker;
      if (!Array.isArray(value)) {
        value = [value, value];
      }
      if (!Array.isArray(mode)) {
        mode = [mode, mode];
      }
      break;
    case 'week':
      format = format || 'YYYY-wo';
      Component = WeekPicker;
      break;
    default:
      format = format || 'YYYY-MM-DD';
      Component = DatePicker;
      break;
    }
    return <Component id={key}
    autoFocus={this.props.autoFocus}
    mode={mode}
    size={size}
    className='input'
    showToday={showToday}
    allowClear={clear} showTime={showTime} disabled={disabled}
    placeholder={placeholder}
    format={format}
    value={value}
    //defaultValue={defaultValue}
    defaultPickerValue={defaultPickerValue}
    onChange={(dates)=>{
      if (Array.isArray(dates)){
        this.handleChange(dates.map(date=>date.toDate()));
      }else{
        this.handleChange(dates.toDate());
      }
    }}
    onBlur={()=>this.context.onEvent(config, 'blur')}
    onFocus={()=>this.context.onEvent(config, 'focus')}
    />
  }

  renderTimePicker(config) {
    const {
      key,
      value,
      clear,
      format,
      //defaultValue,
      placeholder,
      disabled,
      size
    } = config;
    return <TimePicker  id={key}
    autoFocus={this.props.autoFocus}
    size={size}
    className='input'
    allowClear={clear}  disabled={disabled}
    placeholder={placeholder}
    //defaultValue={defaultValue}
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
      disabled={disabled}
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
      disabled={disabled}
      checked={!!value} defaultChecked={!!defaultValue}
      onChange={(value)=>{this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(config, 'blur')}
      onFocus={()=>this.context.onEvent(config, 'focus')}
      ></Switch>
  }

  renderSelect(config) {
    let {
      key,
      value,
      //defaultValue,
      disabled,
      placeholder,
      size,
      mode,
      dataSource,
    } = config;
    value = 'value' in this.props ? this.props.value : value;
    return <Select
      id={key}
      className='input'
      autoFocus={this.props.autoFocus}
      size={size}
      showSearch
      mode={mode}
      disabled={disabled}
      value={value}
      //defaultValue={defaultValue}
      placeholder={placeholder}
      optionFilterProp='children'
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={(value)=>{this.handleChange(value)}}
      onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
      onFocus={()=>this.context.onEvent(this.props.config, 'focus')}>
      {dataSource.map((d,key) => <Select.Option key={key} value={d.value}>{d.title || d.text}</Select.Option>)}
    </Select>
  }

  renderTreeSelect(config) {
    let {
      key,
      value,
      //defaultValue,
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
    value = 'value' in this.props ? this.props.value : value;
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
        value={value}
        //defaultValue={defaultValue}
        disabled={disabled}
        onChange={(value)=>{this.handleChange(value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}>
        </TreeSelect>
  }

  renderRefSelect(config) {
    const {
      key,
      //defaultValue,
      disabled,
      size,
      dataSource,
      showSearch,
      allowClear,
      multiple,
      defaultExpandAll,
      defaultExpandKeys = [],
      buttons = [],
      // 计算属性
      displayValue,
      displayColumns,
      displayShowHeader
    } = config;
    const prefixCls = 'ref-select';
    // labelInValue 用于格式化显示
    return <RcRefSelect id={key}
        className='input'
        prefixCls={prefixCls}
        autoFocus={this.props.autoFocus}
        labelInValue={true}
        allowClear={allowClear}
        showSearch={showSearch}
        multiple={multiple}
        dataSource={dataSource}
        defaultExpandAll={defaultExpandAll}
        defaultExpandKeys={defaultExpandKeys}
        showHeader={displayShowHeader}
        columns={renderColumns(displayColumns)}
        removeIcon={<Icon type="close" className={`${prefixCls}-remove-icon`} />}
        referIcon={<Icon type="search" className={`${prefixCls}-refer-icon`} />}
        value={displayValue}
        size={size}
        tableFooter={buttons?()=><ToolButtons className={`${prefixCls}-footer-buttons`} config={{items:buttons}} />:null}
        //defaultValue={defaultValue}
        disabled={disabled}
        onRefer={()=>this.context.onEvent(this.props.config, 'refer')}
        onChange={(value)=>{multiple?this.handleChange(Array.from(new Set(value.map(it=>it.value)))):this.handleChange(value.value)}}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}/>
  }

  renderInputTable(config) {
    return <InputTable config={config} disabled={config.disable} autoFocus={this.props.autoFocus} onChange={this.handleChange}/>
  }

  renderText(config) {
    return <span className='text'>{config.value}</span>;
  }

  render() {
    const {
      config,
    } = this.props;
    let element;
    if (config.readonly) {
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
      case 'numberinput':
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
      case 'datepicker':
        element = this.renderDatePicker(config);
        break;
      case 'time':
      case 'timepicker':
        element = this.renderTimePicker(config);
        break;
      case 'select':
      case 'listselect':
        if (config.dropdownStyle === 'tree') {
          element = this.renderTreeSelect(config);
        } else {
          element = this.renderSelect(config);
        }
        break;
      case 'refer':
      case 'refselect':
      case 'treetableselect':
        element = this.renderRefSelect(config);
        break;
      case 'subtable':
      case 'inputtable':
        element = this.renderInputTable(config);
        break;
      default:
        //warn('not support input type ' + config.type);
        element = <span className='notsupport'></span>;
      }
    }
    let style;
    if (config.width) {
      style = {
        width: config.width
      };
    }
    return (<div className={'inputitem '+config.type} style={style}>
      {element}
    </div>);
  }
}
