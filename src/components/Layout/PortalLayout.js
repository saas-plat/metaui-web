import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import {
  Layout
} from 'antd';
import './style';
const {
  Header,
  Content,
  Sider,
  Footer
} = Layout;

@observer
export default class PortalLayout extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    autoFocus: PropTypes.bool,
    renderItem: PropTypes.func.isRequired,
  }

  render() {
    const {
      layout,
      items = [],
    } = this.props.config;
    let hasFocus = false;
    let contents = [];
    for (let i = 0, l = items.length; i < l; i++) {
      const it = items[i];
      let autoFocus = false;
      // 四种常用布局模式
      if (layout === 'topbottom') {
        if (i === 0) {
          contents.push(<Header className='header' key={it.key}>
            {this.props.renderItem(it,{autoFocus,type:'menu'}, items)}
          </Header>)
        } else if (i === 1) {
          if (this.props.autoFocus && !it.disabled && !hasFocus) {
            autoFocus = true;
            hasFocus = true;
          }
          contents.push(<Content className='content' key={it.key}>
            {this.props.renderItem(it,{autoFocus}, items)}
          </Content>)
        } else if (i === 2) {
          contents.push(<Footer className='footer' key={it.key}>
            {this.props.renderItem(it,{autoFocus}, items)}
          </Footer>)
        } else {
          console.warn('layout not render!', it);
        }
      }
      if (layout === 'sidercontent') {
        if (i === 0) {
          contents.push(<Sider className='sider' key={it.key}>
              {this.props.renderItem(it,{autoFocus,type:'menu',mode:'inline'}, items)}
            </Sider>)
        } else if (i === 1) {
          if (this.props.autoFocus && !it.disabled && !hasFocus) {
            autoFocus = true;
            hasFocus = true;
          }
          contents.push(<Content className='content' key={it.key}>
              {this.props.renderItem(it,{autoFocus}, items)}
            </Content>)
        } else {
          console.warn('layout not render!', it);
        }
      }
      if (layout === 'contentsider') {
        if (i === 0) {
          if (this.props.autoFocus && !it.disabled && !hasFocus) {
            autoFocus = true;
            hasFocus = true;
          }
          contents.push(<Content className='content' key={it.key}>
            {this.props.renderItem(it,{autoFocus}, items)}
          </Content>)

        } else if (i === 1) {
          contents.push(<Sider className='sider' key={it.key}>
              {this.props.renderItem(it,{autoFocus,type:'menu',mode:'inline'}, items)}
            </Sider>)
        } else {
          console.warn('layout not render!', it);
        }
      }

      if (layout === 'sidertopbottom') {
        if (i === 0) {
          contents.push(<Sider className='sider' key={it.key}>
            {this.props.renderItem(it,{autoFocus,type:'menu',mode:'inline'}, items)}
          </Sider>)
        } else if (i === 1) {
          if (this.props.autoFocus && !it.disabled && !hasFocus) {
            autoFocus = true;
            hasFocus = true;
          }
          contents.push(<Layout key={it.key}>
            <Header className='header'>
              {this.props.renderItem(it,{autoFocus:false,type:'menu'}, items)}
            </Header>
              {i+1<l?<Content className='content'>
              {this.props.renderItem(it,{autoFocus}, items)}
            </Content>:null}
              {i+2<l?<Footer className='footer'>
              {this.props.renderItem(it,{autoFocus:false}, items)}
            </Footer>:null}
          </Layout>)
          i += 2;
        } else {
          console.warn('layout not render!', it);
        }
      }
    }
    return (<Layout className={['layout','portal'].join(' ')}>
      {contents}
    </Layout>);
  }
}
