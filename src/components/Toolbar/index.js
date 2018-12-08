import React from 'react';
import {
  Button,
  Dropdown,
  Menu,
  Icon
} from 'antd';
import PropTypes from 'prop-types';
import './style';
import BaseComponent from '../BaseComponent';
import {
  observer
} from "mobx-react";

const TextAndIcon = observer(({
  config
}) => {
  return <span>{config.icon?<Icon type={config.icon}/>:null}{config.text}</span>
});

TextAndIcon.propTypes = {
  config: PropTypes.object,
}

@observer
export class ButtonItem extends BaseComponent {
  static propTypes = {
    config: PropTypes.object,
  };

  handleMenuClick = () => {
    const config = this.props.config;
    if (config && config.onClick && !config.disabled) {
      this.context.onEvent(config, 'click');
    }
  }

  render() {
    const config = this.props.config;
    return (
      <Button disabled={config.disabled} type={config.type} onClick={this.handleMenuClick}>
      <TextAndIcon config={config}/>
    </Button>
    );
  }
}

@observer
export class DropdownButton extends BaseComponent {
  static propTypes = {
    config: PropTypes.object,
  };

  handleMenuClick = ({
    key
  }) => {
    const item = this.props.config.items.find(it => it.key === key);
    if (item && item.onClick) {
      this.context.onEvent(this.props.config, 'click');
    }
  }

  renderMenu(items) {
    return (
      <Menu onClick={this.handleMenuClick}>
        {items.map(it => (
          <Menu.Item key={it.key}>
            <Icon type={it.icon}/> {it.text}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    const config = this.props.config;
    if (config.items.length <= 0) {
      return <ButtonItem config={config}/>;
    }
    if (config.action) {
      return (
        <Dropdown.Button
          disabled={config.disabled}
          onClick={()=>this.context.onEvent(config, 'click')}
          overlay={this.renderMenu(config.items)}>
          <TextAndIcon config={config}/>
        </Dropdown.Button>
      );
    } else {
      return (
        <Dropdown overlay={this.renderMenu(config.items)}>
          <ButtonItem config={config}/>
        </Dropdown>
      );
    }
  }
}

export default class Toolbar extends BaseComponent {
  render() {
    return (
      <div className='toolbar'>
      {this.props.config.text?<h2 className='title'>{this.props.config.text}</h2>:null}
      {(this.props.config.groups).map(g => ((g.items.length > 1 || (g.items.length === 1 && g.items[0].items.length <= 0))
        ? <Button.Group
            key={g.key}
            className={['btn',g.pull]}>
            {g.items.map(it => <DropdownButton key={it.key} config={it}/>)}
          </Button.Group>
        : (g.items.length === 1)
          ? <DropdownButton key={g.items[0].key} config={g.items[0]}/>
          : null))}
        </div>
    );
  }
}
