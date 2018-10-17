import React from 'react';
import {observer} from "mobx-react";
import Spin from '../../components/Spin';
import ChartComponent from '../../components/Chart';
import './style.less';

@observer
export default class Chart extends React.Component{
  render() {
    const {view, store} = this.props;
    const { loading, loadingText } = store;
    return (<div className='chart'>
      <Spin spinning={loading} tip={loadingText}>
        <ChartComponent config={view.chart}/>
      </Spin>
    </div>)
  }
}
