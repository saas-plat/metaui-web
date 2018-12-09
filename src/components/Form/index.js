import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Tooltip,
  Icon
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
    submitText: PropTypes.string,
    submitButtonHide: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.element,
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
      if(err){
        return;
      }
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
    let labelHelp = null;
    if (config.labelIcon){
      let icon = <Icon type="question-circle" />;
      if (config.tipText){
        labelHelp = <Tooltip title={config.tipText}>
          {icon}
        </Tooltip>
      }else{
        labelHelp = icon;
      }      
    }
    return <FormItem key={config.key} {...formItemLayout} label={<span>{config.labelText} {labelHelp}</span>} className='formItem' extra={config.extra}>
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
    let labelSpan = this.props.config.labelSpan;
    const tailFormItemLayout = this.props.config.layout === 'horizontal' ? {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24-labelSpan,
        offset: labelSpan,
      },
    } : null;

    return (
      <Form className="templateform" layout={this.props.config.itemLayoutType} onSubmit={this.handleSave}>
        {this.renderLayout(this.props.config)}
        {!this.props.submitButtonHide?<FormItem {...tailFormItemLayout}>
          <Button type="primary" block={this.props.block} htmlType="submit">{this.props.submitText || this.context.t('保存')}</Button>
        </FormItem>:null}
        {this.props.children || null}
      </Form>
    );
  }
}
