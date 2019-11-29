import React from 'react';
import {
  Button,
  Dropdown,
  Menu,
  Icon
} from 'antd';
import PropTypes from 'prop-types';
import {
  UIComponent
} from 'saas-plat-metaui';
import {
  observer
} from "mobx-react";
import './style';
const ButtonGroup = Button.Group;
const {
  SubMenu
} = Menu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

@observer
class TextAndIcon extends UIComponent {
  render() {
    const {
      config
    } = this.props;
    const {
      t
    } = this.context;
    return <span>{config.icon?<Icon type={config.icon}/>:null}{config.text || t('未命名')}</span>
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

  handleClick = () => {
    const item = this.props.config;
    if (item && !item.disabled) {
      this.context.onEvent(item, 'click');
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
      this.context.onEvent(item, 'click');
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

  render() {
    const {
      config,
      ...other
    } = this.props;
    const {
      key,
      items,
      style,
      disabled,
      onClick
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
      return (
        <Button key={key} className='btn' disabled={disabled} type={style} onClick={this.handleClick}>
          <TextAndIcon config={this.props.config}/>
        </Button>
      );
    }
    if (style === 'divider') {
      if (childType === 'menu') {
        return <MenuDivider key={key}/>
      } else {
        return <div key={key} className='btn divider'></div>
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
      return (
        <Dropdown.Button key={key}
          disabled={disabled}
          onClick={()=>this.context.onEvent(this.props.config, 'click')}
          overlay={this.renderMenu(items)}>
          <TextAndIcon config={this.props.config}/>
        </Dropdown.Button>
      );
    } else {
      return (
        <Dropdown key={key} overlay={this.renderMenu(items)}>
          <Button className='btn' type={style} disabled={disabled} onClick={this.handleClick}>
            <TextAndIcon config={this.props.config}/>
          </Button>
        </Dropdown>
      );
    }
  }
}

export class Toolbar extends UIComponent {
  render() {
    const {
      text,
      items
    } = this.props.config;
    return (
      <div className='toolbar'>
      { text?<h2 className='title'>{text}</h2>:null}
      {items.map(this.renderItem)}
    </div>
    );
  }
}

export class ToolButtonGroup extends UIComponent {
  static childContextTypes = {
    childType: PropTypes.string,
  }

  static contextTypes = {
    childType: PropTypes.string,
  }

  getChildContext() {
    return {
      childType: this.childType || this.context.childType,
    };
  }

  render() {
    const {
      config,
      ...other
    } = this.props;
    const {
      childType
    } = this.context;
    const {
      key,
      text,
      items
    } = config;
    if (childType === 'menu') {
      return (<Menu.ItemGroup {...other} key={key} title={text}>
         {items.map(this.renderItem)}
        </Menu.ItemGroup>)
    }
    return (
      <ButtonGroup key={key} className='toolgroup'>
        { text?<h2 className='title'>{text}</h2>:null}
        {items.map(this.renderItem)}
      </ButtonGroup>
    );
  }
}

export class ToolButtons extends UIComponent {
  render() {
    const {
      key,
      text,
      items
    } = this.props.config;
    return (
      <div key={key} className='toolbtns'>
        { text?<h2 className='title'>{text}</h2>:null}
        {items.map(this.renderItem)}
      </div>
    );
  }
}
