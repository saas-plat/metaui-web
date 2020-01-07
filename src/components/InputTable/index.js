import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
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
export default class InputTable extends React.Component {
  static propTypes = {
    table: PropTypes.any,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    width: PropTypes.number,
    title: PropTypes.string,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    autoFocus: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onClear: PropTypes.func,
  }

  static defaultProps = {
    width: 720,
  }

  state = {
    loading: false,
    visible: false,
    foucsed: false,
    hover: false
  }

  showModal = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      visible: true,
    });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  handleOk = () => {
    this.setState({
      loading: true
    });
    if (this.props.onClose) {
      this.props.onClose(true);
    }
    this.setState({
      loading: false,
      visible: false
    });
  }

  handleCancel = () => {
    if (this.props.onClose) {
      this.props.onClose(false);
    }
    this.setState({
      visible: false
    });
  }

  handleFocus = () => {
    const {
      onFocus
    } = this.props;
    this.setState({
      foucsed: true
    })
    if (onFocus) {
      onFocus();
    }
  }

  handleBlur = () => {
    const {
      onBlur
    } = this.props;
    this.setState({
      foucsed: false
    })
    if (onBlur) {
      onBlur();
    }
  }

  handleHover = () => {
    this.setState({
      hover: true
    })

  }

  handleHoverOut = ()=>{
    this.setState({
      hover: false
    })
  }

  render() {
    const {
      table,
      value,
      //defaultValue,
      placeholder,
      disabled,
      size,
      width,
      title,
      cancelText,
      okText,
      autoFocus,
      onChange,
      onClear
    } = this.props;
    const {
      visible,
      loading
    } = this.state;
    const suffix =
      this.state.hover ?<Icon type="close-circle" onClick={onClear} theme="filled" onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverOut}/> :
      <Icon type="table" onClick={this.showModal} />;
    return (<div className='inputtable'>
      <Input
        suffix={suffix}
        autoFocus={autoFocus}
        size={size}
        className={'input'+(disabled ?' disabled':'')}
        placeholder={placeholder}
        //defaultValue={defaultValue}
        readOnly
        disabled={disabled }
        value={value}
        onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverOut}
        onClick={this.showModal}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
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
              {cancelText}
            </Button>,
            <Button key="ok" type="primary" className="ok" loading={loading} onClick={this.handleOk}>
              {okText}
            </Button>
          ]}>
          <EditableTable config={table} onChange={onChange} />
        </Modal>
    </div>);
  }
}
