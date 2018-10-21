renderModuleSelector() {
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
    return (<Breadcrumb.Item>
      <Dropdown overlay={menu} trigger={['hover']}>
        <span>
          <a className="ant-dropdown-link" href="#" onClick={this.changeModuleToCurrent}>
            {stores.moduleStore.curModule.name}
          </a>
          <Icon type="down"/>
        </span>
      </Dropdown>
    </Breadcrumb.Item>);
  }
