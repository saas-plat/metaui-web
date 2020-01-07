import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import {UIComponent} from 'saas-plat-metaui';
import {
  Modal,
  Input,
  Icon,
  Button
} from 'antd';
import EditableTable from '../EditableTable';
import './style';

// 可录入子表，用于相关表单的快速录入，比如进货时录入预付款信息
@observer
export default class InputTable extends UIComponent {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    // for form item
    onChange: PropTypes.func,
  }

  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    if (this.props.config.disabled || this.props.disabled) {
      return;
    }
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      loading: true
    });

    this.setState({
      loading: false,
      visible: false
    });

  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleChange = (value) => {
    this.context.onEvent(this.props.config, 'change', {
      value
    });
    this.props.onChange && this.props.onChange(value);
  }

  handleDefaultRowChange = (e) => {
    // 修改默认行
  }

  render() {
    const {
      key,
      value,
      //defaultValue,
      placeholder,
      disabled,
      size,
      width = 720,
      title = this.context.t('编辑')
    } = this.props.config;
    const {
      visible,
      loading
    } = this.state;
    const suffix = <Icon type="table" onClick={this.showModal} />
    return (<div className='inputtable'>
      <Input
        id={key}
        suffix={suffix}
        autoFocus={this.props.autoFocus}
        size={size}
        className={'input'+(disabled || this.props.disabled?' disabled':'')}
        placeholder={placeholder}
        //defaultValue={defaultValue}
        readOnly
        disabled={disabled || this.props.disabled}
        value={value}
        onClick={this.showModal}
        onChange={()=>this.context.onEvent(this.props.config, 'change')}
        onBlur={()=>this.context.onEvent(this.props.config, 'blur')}
        onFocus={()=>this.context.onEvent(this.props.config, 'focus')}
      />
      <Modal
        className='inputtable-modal'
        width={width}
          visible={visible}
          title={title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancel" type="default" className="cancel" onClick={this.handleCancel}>
              {this.context.t('取消')}
            </Button>,
            <Button key="ok" type="primary" className="ok" loading={loading} onClick={this.handleOk}>
              {this.context.t('确定')}
            </Button>
          ]}>
          <EditableTable config={this.props.config} onChange={this.handleChange} />
        </Modal>
    </div>);
  }
}
