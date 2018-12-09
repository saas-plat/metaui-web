import React from 'react';
import PropTypes from 'prop-types';
import {
  Form
} from 'antd';
import './style';
import {
  createComponent
} from '../util';
import {
  FlowLayout,
  GridLayout
} from '../Layout';
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
    this.changeValues = {
      ...this.changeValues,
      [it.name]: value
    };
    if (this.timer) {
      return;
    }
    this.timer = setTimeout(() => {
      const args = {...this.changeValues};
      this.changeValues = {};
      this.context.onEvent(this.props.config, 'change', args);
      this.timer = null;
    }, 400);
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.context.onEvent(this.props.config, 'submit', values, ()=>{
        this.props.onSubmit && this.props.onSubmit(values);
      });
    });
  }

  handleReset = () => {
    this.context.onEvent(this.props.config, 'reset', null, ()=>{
      this.props.form.resetFields();
    });
  }

  renderFormItem = (config, options) => {
    const {
      getFieldDecorator
    } = this.props.form;
    let labelSpan = config.labelSpan;
    const formItemLayout = this.props.config.layout === 'horizontal' ? {
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
    } : null;
    return <FormItem key={config.key} {...formItemLayout} label={config.labelText} className='formItem' extra={config.extra}>
            {getFieldDecorator(config.key,{rules: config.rules.map(it=>it.toJS())})(
              createComponent(config.formItem, {
                ...options,
                onChange:(value)=>this.handleChangeTimer(config.formItem, value)
            }))}
          </FormItem>
  }

  renderLayout(config) {
    return config.items.filter(it => it.visible).map((it, i) => this.renderFormItem(it, {
      autoFocus: i === 0
    }));
  }

  render() {
    return (
      <Form className="templateform" layout={this.props.config.itemLayoutType} onSubmit={this.handleSave}>
        {this.renderLayout(this.props.config)}
      </Form>
    );
  }
}
