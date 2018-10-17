import React from 'react';
import Spin from '../../components/Spin';
import TreeTable from '../../components/TreeTable';
import {
  Total
} from '../../components/Total';
import {
  Toolbar
} from '../../components/toolbar';
import './style.less';

export default class VoucherList extends React.Component{
  render() {
    const {
      view,
      store
    } = this.props;
    const {
      loading,
      loadingText
    } = store;
    return (<div className='voucherlist'>
        <Spin spinning={loading} tip={loadingText}>
          {view.toolbar?<Toolbar config={view.toolbar} mode='header'/>:null}
          <TreeTable config={{tree:view.tree,table:view.table}}/>
          {view.total?<Total config={view.total}/>:null}
          {view.footer?<Toolbar config={view.footer} mode='footer'/>:null}
        </Spin>
      </div>)
  }
}
