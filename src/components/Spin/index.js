import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default (props)=>(<Spin indicator={antIcon} delay={1000} {...props}>{props.children}</Spin>);
