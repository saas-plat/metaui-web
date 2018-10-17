import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect
} from 'react-router';
import {
  moduleStore,
  user,
  ui
} from '../stores';
import Spin from '../components/Spin';
import qs from 'querystring';

export default class Enter extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  render() {
    const {
      location
    } = this.props;
    const q = qs.parse(location.search.substr(1));
    if (!user.isAuthenticated) {
      // 没有登录先登录
      return <Redirect to={'login?redirect=' + location.pathname}/>
    } else if (!user.orgid) {
      // 没有企业需要进入管控台创建企业或选择一个企业
      return <Redirect to='/org/enter'/>
    } else if (location.pathname === '/install') {
      return <Redirect to={'/' + user.orgid+'/manage/product/'+q.pid}/>
    } else if (location.pathname === '/user') {
      return <Redirect to={'/' + user.orgid+'/manage/user'}/>
    } else if (location.pathname === '/privilege') {
      return <Redirect to={'/' + user.orgid+'/manage/privilege'}/>
    } else {
      // 如果用户只有一个功能模块直接进入模块，否则进入home
      const modules = moduleStore.modules.filter(it => it.orgid === user.orgid);
      return (<Spin wrapperClassName='loading' spinning={ui.loading} tip={ui.loadingText} delay={1000}>
        {modules.length===1?<Redirect to={'/' +modules[0].uid }/>:<Redirect to={'/' + user.orgid}/>}
      </Spin>)
    }
  }
}
