import React from 'react';
import {observer} from "mobx-react";
import Spin from '../../components/Spin';
import TotalAmount from '../../components/TotalAmount';
import './style.less';

@observer
export default class Amount extends React.Component{
  render() {
    const {view, store} = this.props;
    const { loading, loadingText } = store;
    return (<div className='amount'>
      <Spin spinning={loading} tip={loadingText}>
        <TotalAmount config={view.amount}/>
      </Spin>
    </div>)
  }
}
