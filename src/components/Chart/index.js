import React from 'react';
import Spin from '../Spin';
import BaseComponent from '../BaseComponent';
import './style.less';
const style = require('!less-to-json-loader!./style.less');

const loadEchart = (cb) => {
  require.ensure([], require => {
    cb(require('./Echart').default);
  }, 'echart');
}

export default class Chart extends BaseComponent {

  getOption() {
    const {
      config
    } = this.props;
    //柱状图数据
    const barOption = {
      color: [style['primary-color']],  // todo 这里的颜色需要充default.less中取@brand-primary
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'xxxx',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }]
    };

    return barOption;
  }

  onChartClick = () => {
    this.context.onEvent(this.props.config, 'click');
  }

  onChartReadyCallback = () => {
    this.context.onEvent(this.props.config, 'ready');
  }

  componentWillMount() {
    loadEchart((Echart) => {
      this.setState({
        Echart
      })
    })
  }

  render() {
    const {
      config
    } = this.props;
    return (<div className='chart'>
         <Spin spinning={!this.state.Echart}/>
          {this.state.Echart?<this.state.Echart
            option={this.getOption()}
            style={{height:config.style.height, width: config.style.width}}
            // notMerge={true}
            // lazyUpdate={true}
            //theme="my_theme"
            onChartReady={this.onChartReadyCallback}
            onEvents={{
              click: this.onChartClick,
            }}
            opts={{renderer: 'svg'}}/>:null}
      </div>);
  }
}