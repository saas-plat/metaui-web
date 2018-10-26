import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Icon,
  Breadcrumb,
  Dropdown,
} from 'antd';
import {history,stores} from 'saas-plat-clientfx';
import {
  translate
} from 'react-i18next';
import {
  observer
} from "mobx-react";

@translate('pages')
@observer
export default class ModuleBreadcrumb extends React.Component {
  static propTypes = {
      t: PropTypes.func
    }

   changeModule = ({
    key
  }) => {
    history.push(`/${key}`);
  }

  changeModuleToCurrent = () => {
    this.changeModule({
      key: stores.moduleStore.curModule.uid
    });
  }

  render () {
    if (stores.moduleStore.openedModules.length <= 0) {
      return null;
    }
    if (stores.moduleStore.openedModules.length === 1) {
      return (<Breadcrumb.Item><a href="#" onClick={this.changeModuleToCurrent}>
        {stores.moduleStore.curModule.name}
      </a></Breadcrumb.Item>);
    }
    const menu = (<Menu onClick={this.changeModule} theme={stores.user.theme}>
      {
        stores.moduleStore.openedModules.map(it => (<Menu.Item key={it.uid}>
          {it.name}
        </Menu.Item>))
      }
    </Menu>);
    return (<Dropdown overlay={menu} trigger={['hover']}>
        <span>
          <a className="ant-dropdown-link" href="#" onClick={this.changeModuleToCurrent}>
            {stores.moduleStore.curModule.name}
          </a>
          <Icon type="down"/>
        </span>
      </Dropdown>);
  }
}
