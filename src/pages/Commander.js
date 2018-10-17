import React from 'react';
import {
  Button,
  Input,
  message,
  AutoComplete,
  Tooltip,
  Icon
} from 'antd';
import {
  actions,
  executeAction
} from '../controller';
import {
  ui,
  user
} from '../stores';
import i18n from '../i18n';
import {
  warn
} from '../log';
import config from '../config';
import './commander.less';
const {
  TextArea
} = Input;

document.onkeydown = function () {
  var oEvent = window.event;
  if (oEvent.ctrlKey && oEvent.keyCode == 123) { // ctrl+f12
    if (user.isDeveloper) {
      if (ui.modal.visible) {
        ui.modal.hide();
        return;
      }
      ui.modal.show({
        title: 'Commander',
        url: '/commander'
      });
    } else {
      warn('commander disabled');
    }
  }
}

export default class Commander extends React.Component {
  state = {
    dataSource: [],
  }

  constructor() {
    super();
    this.actionNames = Object.keys(actions);
  }

  handleSearch = (value) => {
    this.selected = false;
    this.setState({
      dataSource: !value ? this.actionNames : this.actionNames.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) > -1),
    });
  }

  handleSelect = () => {
    this.selected = true;
  }

  executeAction = () => {
    if (!this.state.name) {
      return;
    }
    let args;
    try {
      args = JSON.parse(this.state.args || null);
    } catch (err) {
      message.error(err.message);
      return;
    }
    ui.modal.hide();
    executeAction({
      name: this.state.name,
      args
    });
  }

  actionNameChange = (name) => {
    this.setState({
      name
    })
  }

  actionArgseChange = (e) => {
    this.setState({
      args:e.target.value
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.autoComplete.focus();
    }, 0);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.autoComplete.focus();
    }, 0);
  }

  handleKeyDown = (e) => {
    //ctrl + enter
    if (e.ctrlKey && e.keyCode === 13) {
      this.executeAction();
    }
  }

  gotoDoc = ()=>{
    window.open(config.devDocUrl+(this.state.name?('/'+this.state.name):''));
  }

  render() {
    const {
      dataSource
    } = this.state;
    return (<div className='commander'>
      <div>
        <AutoComplete
          ref={ref=>this.autoComplete=ref}
          autoFocus
          dataSource={dataSource}
          className='action full-width'
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          onChange={this.actionNameChange}
          placeholder="action name">
          <Input suffix={<Icon type="search" className="certain-category-icon" />}
          onKeyDown={this.handleKeyDown}/>
        </AutoComplete>
      </div>
      <div>
        <Tooltip title={i18n.t('到开发者社区查找接口文档?')}>
          <Icon className='help' type="question-circle"  onClick={this.gotoDoc} />
        </Tooltip>
        <TextArea className='args' rows={4}
          onChange={this.actionArgseChange} defaultValue={'{\n  \n}'}
          onKeyDown={this.handleKeyDown}/>
      </div>
      <div>
      <Button type="primary" className='full-width' disabled={!this.state.name} onClick={this.executeAction}>Execute (ctrl+enter)</Button>
      </div>
    </div>);
  }
}
