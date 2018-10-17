import React from 'react';
import {
  observer
} from "mobx-react";
import {
  Layout
} from 'antd';
import './frame.less';
import PropTypes from 'prop-types';
import {
  user,
  ui
} from '../../stores';
import config from '../../config';
const {
  Header,
  Content,
  Footer
} = Layout;

@observer
export default class PageFrame extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  renderLogo = () => {
    return (<div className="logo">{config.title}</div>);
  }

  renderFooter() {
    return config.copyRights;
  }

  render() {
      return (<Layout className={['framelayout', user.theme]}>
      <Header style={ui.layout.style} className='header'>
        {this.renderLogo()}
      </Header>
      <Content className='content'>
        {this.props.children || null}
      </Content>
      <Footer className='footer'>
        {this.renderFooter()}
      </Footer>
    </Layout>);
  }
}
