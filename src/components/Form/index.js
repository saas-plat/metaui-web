import React from 'react';
import PropTypes from 'prop-types';
import {
  Form
} from 'antd';
import './style';
import {
  createComponent
} from '../util';
import BaseComponent from '../BaseComponent';

const FormItem = Form.Item;

@Form.create()
export default class TemplateForm extends BaseComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    form: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  handleChangeTimer = (it, value) => {
    this.changeValues = { ...this.changeValues,
      [it.name]: value
    };
    if (this.timer) {
      return;
    }
    this.timer = setTimeout(() => {
      this.context.onEvent(this.props.config, 'change', this.changeValues);
      this.timer = null;
    }, 400);
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.onSubmit && this.props.onSubmit(values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  renderFormItem = (config) => {
    const {
      getFieldDecorator
    } = this.props.form;
    let labelSpan = config.labelSpan;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: labelSpan
        },
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 24 - labelSpan
        },
      }
    };
    return <FormItem key={config.key} {...formItemLayout} label={config.labelText} className='formItem'>
            {getFieldDecorator(config.key,{rules: config.rules.map(it=>it.toJS())})(
              createComponent(config.formItem, {
              onChange:(value)=>this.handleChangeTimer(config.formItem, value)
            }))}
          </FormItem>
  }

  render() {
    return (
      <Form className="templateform" onSubmit={this.handleSave}>
        {this.props.config.items.filter(it=>it.visible).map(it=>this.renderFormItem(it))}
      </Form>
    );
  }
}
