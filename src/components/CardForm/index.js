import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Tabs
} from 'antd';
import {
  FlowLayout,
  GridLayout
} from '../Layout';
import './style';
import {
  createComponent
} from '../util';
import BaseComponent from '../BaseComponent';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@Form.create()
export default class CardForm extends BaseComponent {
  static propTypes = {
    config: PropTypes.object.isRequired,
    form: PropTypes.object,
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
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  // To generate mock Form.Item
  renderFormItem = (config, options) => {
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
    return <FormItem {...formItemLayout} label={config.labelText} className='formItem' extra={config.extra}>
            {getFieldDecorator(config.formItem.name,{rules: config.rules.map(it=>it.toJS())})(createComponent(config.formItem, {
              ...options,
              onChange:(value)=>this.handleChangeTimer(config.formItem, value)
            }))}
          </FormItem>
  }

  renderTitle() {
    return this.props.config.title ? (
      <div className='title'>{this.props.config.title}</div>
    ) : null;
  }

  renderLayout(config) {
    let autoFocus = false;
    if (!this.autoFocus) {
      autoFocus = true;
      this.autoFocus = true;
    }
    if (config.type === 'grid') {
      return <GridLayout key={config.key} config={config} autoFocus={autoFocus} renderItem={this.renderFormItem}/>;
    } else {
      return <FlowLayout key={config.key} config={config} autoFocus={autoFocus} renderItem={this.renderFormItem}/>;
    }
  }

  renderGroup(config) {
    const {
      tabs
    } = config;
    if (tabs.length == 1) {
      return this.renderLayout(tabs[0].panel);
    }
    return <Tabs type="card" className='group' key={config.key}>
      {tabs.filter(it=>it.visible).map(it=>(
        <TabPane tab={it.text} key={it.key}>
          {this.renderLayout(it.panel)}
        </TabPane>))}
    </Tabs>
  }

  render() {
    const {
      groups
    } = this.props.config;
    this.autoFocus = false;
    return (
      <Form className="cardform" onSubmit={this.handleSave}>
        {this.renderTitle()}
        {groups.filter(it=>it.visible).map(it=>this.renderGroup(it))}
      </Form>
    );
  }
}
