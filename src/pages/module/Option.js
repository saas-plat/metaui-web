import React from 'react';
import {observer} from "mobx-react";
import Spin from '../../components/Spin';
import ListGroup from '../../components/ListGroup';
import './style.less';

@observer
export default class Option extends React.Component{
  render() {
    const {view, store} = this.props;
    const { loading, loadingText } = store;
    return (<div className='option'>
      <Spin spinning={loading} tip={loadingText}>
        <ListGroup config={view.listGroup}/>
      </Spin>
    </div>)
  }
}
