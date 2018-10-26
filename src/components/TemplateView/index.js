import React from 'react';
import {
  Alert
} from 'antd';
import {
  observer
} from "mobx-react";
import * as tmpStores from '../../stores';
import templateEngine from '../../template';
import {log,history,stores} from 'saas-plat-clientfx';
const {
  warn
} = log;
import PropTypes from 'prop-types';
import './style.less';
import {
  translate
} from 'react-i18next';
import ViewWarpper from './ViewWarpper';

@translate('pages')
@observer
export default class TemplateView extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    t: PropTypes.func,
    viewLoader: PropTypes.func
  }

  state = {}

  componentDidMount() {
    this.load(this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    const {
      orgid,
      mid,
      code
    } = this.props.params;
    const {
      params
    } = nextProps;
    if (orgid !== params.orgid || mid !== params.mid || code !== params.code) {
      this.load(params);
    }
  }

  async load({
    orgid,
    mid,
    code
  }) {
    this.setState({
      notSupport: false,
      moduleNotFound: false,
    })
    const module = stores.moduleStore.modules.find(it => it.id === mid && it.orgid === orgid);
    if (module) {
      if (!module.view) {
        this.setState({
          loading: true
        });
        stores.ui.loading.show();
        await stores.moduleStore.loadConfig(module.orgid, module.id);
        await this.createInstance(module, {
          orgid,
          mid,
          code
        });
        stores.ui.loading.hide()
      } else {
        await this.createInstance(module, {
          orgid,
          mid,
          code
        });
      }
    } else {
      this.setState({
        moduleNotFound: true
      });
      warn('module not found ' + mid);
    }
  }

  async createInstance(module, {
    orgid,
    mid,
    code
  }) {
    let id;
    let loading;
    const store = this.getStoreProvider(module);
    if (!store) {
      this.setState({
        loading: false,
        notSupport: true
      });
      return;
    }
    if (code) {
      let inst = templateEngine.findInstance({
        orgid,
        mid,
        code
      });
      if (!inst) {
        // 还没有加载，需要从后端查询id
        stores.ui.loading.show();
        this.setState({
          loading: true
        });
        loading = true;
        const data = store.getByCode ? await store.getByCode({
          orgid,
          mid,
          code
        }) : null;
        if (data && data.id) {
          id = data.id;
        } else {
          // 要是单据编号不存在，清空
          // code = '';
          warn('template instance not found by code ' + code);
          stores.ui.loading.hide()
          this.setState({
            loading: false
          });
          history.replace(`/${orgid}/${mid}`);
          return;
        }
      } else {
        id = inst.options.id;
      }
    }
    this.tmpid = id = id || (store.createId ? store.createId({
      orgid,
      mid,
      code
    }) : null);
    let inst = templateEngine.instances.get(id);
    if (!inst) {
      this.setState({
        loading: true
      });
      if (!loading) {
        stores.ui.loading.show();
      }
      inst = await templateEngine.create(module, id, {
        orgid,
        mid,
        code,
        id
      });
      if (store) {
        store.create && await store.create(inst);
        this.setState({
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          notSupport: true
        });
      }
      stores.ui.loading.hide()
    } else {
      this.setState({
        loading: false
      });
    }
  }

  getStoreProvider({
    type = ''
  }) {
    const provider = tmpStores[type + 'Store'];
    if (!provider) {
      warn('not found store provider for ' + type);
    }
    return provider;
  }

  handleEvent = (target, event, args = {}) => {
    const {
      orgid,
      mid,
      code
    } = this.props.params;
    const inst = code ? templateEngine.findInstance({
      orgid,
      mid,
      code
    }) : templateEngine.instances.get(this.tmpid);
    if (inst) {
      templateEngine.trigger(inst.id, target, event, args);
    }
  }

  renderView(config) {
    if (!config.view.type) {
      log('module type not defined', config.mid);
      return null;
    }
    let Component = this.props.viewLoader(config.view.type);
    if (Component && Component.__esModule) {
      Component = Component.default;
    }
    if (!Component) {
      log('module type not support', config.view.type);
      return null;
    }
    return <ViewWarpper {...config}><Component {...config}/></ViewWarpper>
  }

  renderError({
    error
  }) {
    return (<Alert
      banner
      className='alertbox'
      message={error}
      type="error"
      closable
      onClose={this.handleClose}/>)
  }

  renderNotSupport() {
    return (<Alert
      banner
      className='alertbox'
      message={this.props.t('不支持的模板!')}
      type="warning"
      onClose={this.handleClose}/>)
  }

  renderNotFound() {
    return (<Alert
      banner
      className='alertbox'
      message={this.props.t('模块未找到!')}
      type="warning"
      onClose={this.handleClose}/>)
  }

  renderNotData() {
    return (<Alert
      banner
      className='alertbox'
      message={this.props.t('数据无法加载!')}
      type="warning"
      onClose={this.handleClose}/>)
  }

  render() {
    const {
      orgid,
      mid,
      code
    } = this.props.params;
    let content = null;
    if (!this.state.moduleNotFound) {
      const module = stores.moduleStore.modules.find(it => it.id === mid && it.orgid === orgid);
      if (module) {
        if (module.error) {
          content = this.renderError(module);
        }
        if (!this.state.loading) {
          if (this.state.notSupport) {
            content = this.renderNotSupport(module);
          } else {
            const inst = code ? templateEngine.findInstance({
              orgid,
              mid,
              code
            }) : templateEngine.instances.get(this.tmpid);
            if (inst) {
              const {
                view,
                viewModel
              } = inst;
              const store = this.getStoreProvider(module).items.get(inst.id);
              content = this.renderView({
                orgid,
                mid,
                code,
                id: inst.id,
                view,
                viewModel,
                store,
                onEvent: this.handleEvent
              });
            } else {
              content = this.renderNotData(module);
            }
          }
        }
      }
    } else {
      content = this.renderNotFound();
    }
    return (<div className='template'>
        {content}
    </div>);
  }
}
