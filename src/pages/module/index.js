import React from 'react';
import PropTypes from 'prop-types';
import {stores,observer} from 'saas-plat-clientfx';
import TemplateView from '../../components/TemplateView';
import Spin from '../../components/Spin';

@observer
export default class Module extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    match: PropTypes.object,
    staticContext: PropTypes.object
  }

  componentDidMount() {
    const {
      match,staticContext
    } = this.props;
    if (match.params.mid && match.params.orgid && !(staticContext && staticContext.modalState)) {
      stores.moduleStore.openModule(match.params.orgid, match.params.mid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      match,staticContext
    } = nextProps;
    if (match.params.mid && match.params.orgid && !(staticContext && staticContext.modalState)) {
      stores.moduleStore.openModule(match.params.orgid, match.params.mid);
    }
  }

  render() {
    if (stores.moduleStore.loadOrgs.indexOf(this.props.match.params.orgid) == -1){
      return null;
    }
    return (<TemplateView params={this.props.match.params} viewLoader={(type)=>require('./'+type[0].toUpperCase()+type.substr(1)+'.js')}></TemplateView>);
  }
}
