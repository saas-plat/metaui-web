import React from 'react';
import {
  Popconfirm,
  Button,
  Dropdown,
  Menu,
  Icon
} from 'antd';
import PropTypes from 'prop-types';
import {
  UIComponent
} from '@saas-plat/metaui';
import {
  observer
} from "mobx-react";
import './style';
import classNames from 'classnames';
const ButtonGroup = Button.Group;
const {
  SubMenu
} = Menu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

@observer
export class TextAndIcon extends UIComponent {
  render() {
    const {
      config
    } = this.props;
    return <span>{config.icon?<Icon type={config.icon}/>:null}{config.text || (config.icon?'':this.t('未命名'))}</span>
  }
}

@observer
export class ButtonItem extends UIComponent {

  static childContextTypes = {
    ...UIComponent.childContextTypes,
    childType: PropTypes.string,
  }

  static contextTypes = {
    ...UIComponent.contextTypes,
    childType: PropTypes.string,
  }

  getChildContext() {
    return {
      childType: this.childType || this.context.childType,
    };
  }

  handleClick = (e) => {
    const item = this.props.config;
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (item && !item.disabled) {
      this.onEvent(item, 'click');
    }
  }

  findItem(key, items) {
    return items.find(it => {
      if (it.key === key) {
        return it;
      }
      return this.findItem(key, it.items);
    });
  }

  handleMenuClick = ({
    key
  }) => {
    const item = this.findItem(key, this.props.config.items);
    if (item && !item.disabled) {
      this.onEvent(item, 'click');
    }
  }

  renderMenu(items) {
    this.childType = 'menu';
    return (
      <Menu onClick={this.handleMenuClick}>
        {items.map(this.renderItem)}
      </Menu>
    );
  }

  renderConfirm(btn) {
    const {
      config,
    } = this.props;
    const {
      popTitle,
      okText,
      okType,
      cancelText
    } = config;
    // 支持确认
    if (popTitle) {
      return (<Popconfirm title={popTitle} cancelText={cancelText} okText={okText} okType={okType}
        onConfirm={this.handleClick} onCancel={this.onEvent(this.props.config, 'cancel')}>
        {btn}
      </Popconfirm>)
    }
    return btn;
  }

  render() {
    const {
      config,
      ...other
    } = this.props;
    const {
      key,
      items = [],
      style,
      disabled = false,
      onClick,
    } = config;
    const {
      childType
    } = this.context;
    if (items.length <= 0) {
      if (childType === 'menu') {
        return (
          <MenuItem {...other} key={key} className='menuitem' disabled={disabled}  >
            <TextAndIcon config={this.props.config}/>
          </MenuItem>
        );
      }
      return this.renderConfirm(<Button key={key} className='btn' disabled={disabled} type={style} {...other} onClick={this.handleClick}>
        <TextAndIcon config={this.props.config}/>
      </Button>);
    }
    if (style === 'divider') {
      if (childType === 'menu') {
        return <MenuDivider key={key} {...other}/>
      } else {
        return <div key={key} className='btn divider' {...other}></div>
      }
    }
    if (childType === 'menu') {
      if (items.length > 0) {
        const title = <TextAndIcon config={this.props.config}/>;
        return (<SubMenu {...other} key={key} title={title}>
             {items.map(this.renderItem)}
          </SubMenu>)
      } else {
        return (<MenuItem {...other} key={key}>
            {<TextAndIcon config={this.props.config}/>}
          </MenuItem>)
      }
    }
    if (onClick) {
      return this.renderConfirm(
        <Dropdown.Button key={key}
          disabled={disabled}
          onClick={()=>this.onEvent(this.props.config, 'click')}
          overlay={this.renderMenu(items)} {...other}>
          <TextAndIcon config={this.props.config}/>
        </Dropdown.Button>
      );
    } else {
      return (
        <Dropdown key={key} overlay={this.renderMenu(items)} {...other}>
          {this.renderConfirm(<Button className='btn' type={style} disabled={disabled} onClick={this.handleClick}>
            <TextAndIcon config={this.props.config}/>
          </Button>)}
        </Dropdown>
      );
    }
  }
}

export class ToolbarBase extends UIComponent {
  static childContextTypes = {
    ...UIComponent.childContextTypes,
    childType: PropTypes.string,
  }

  static contextTypes = {
    ...UIComponent.contextTypes,
    childType: PropTypes.string,
  }

  getChildContext() {
    return {
      childType: this.childType || this.context.childType,
    };
  }

  findItem(key, items) {
    return items.find(it => {
      if (it.key === key) {
        return it;
      }
      return this.findItem(key, it.items);
    });
  }

  handleMenuClick = ({
    key
  }) => {
    const item = this.findItem(key, this.props.config.items);
    if (item && !item.disabled) {
      this.onEvent(item, 'click');
    }
  }

  renderMenu() {
    const {
      className,
      config,
      theme="dark",
      mode = "horizontal"
    } = this.props;
    this.childType = 'menu';
    return (
      <Menu mode={mode} theme={theme} className={['menubar',className].join(' ')} onClick={this.handleMenuClick}>
        {(config.items || []).map(it=>this.renderItem(it))}
      </Menu>
    );
  }

  renderButtons(props) {
    const {
      config
    } = this.props;
    return (config.items || []).map(it => this.renderItem(it, props));
  }

  renderToolbar() {
    const {
      onClick
    } = this.props;
    return this.renderToolbar({
      onClick
    });
  }

  render() {
    const {
      type,
    } = this.props;
    if (type === 'menu') {
      return this.renderMenu();
    }
    return this.renderToolbar();
  }
}

export class Toolbar extends ToolbarBase {

  renderToolbar() {
    const {
      className,
      config,
      onClick,
      ...other
    } = this.props;
    const {
      text,
    } = config;
    return (
      <div className={classNames('toolbar',className)} {...other}>
        {text?<h2 className='title'>{text}</h2>:null}
        {this.renderButtons({onClick})}
      </div>
    );
  }
}

export class ToolButtonGroup extends ToolbarBase {

  renderToolbar() {
    const {
      className,
      config,
      onClick,
      ...other
    } = this.props;
    const {
      childType
    } = this.context;
    const {
      key,
      text,
    } = config;
    if (childType === 'menu') {
      return (<Menu.ItemGroup {...other} key={key} title={text}>
         {this.renderButtons({onClick})}
        </Menu.ItemGroup>)
    }
    return (
      <ButtonGroup key={key} className={classNames('toolgroup',className)}>
        { text?<h2 className='title'>{text}</h2>:null}
        {this.renderButtons({onClick})}
      </ButtonGroup>
    );
  }
}

export class ToolButtons extends ToolbarBase {
  renderToolbar() {
    const {
      className,
      config,
      onClick,
      ...other
    } = this.props;
    const {
      key,
      text,
    } = config;
    return (
      <div key={key} className={classNames('toolbtns',className)} {...other}>
        {text?<h2 className='title'>{text}</h2>:null}
        {this.renderButtons({onClick})}
      </div>
    );
  }
}
