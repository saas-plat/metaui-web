import React from "react";
import Spin from "../Spin";
import { UIComponent } from "@saas-plat/metaui";
import "./style";
const style = require("!less-to-json-loader!../style/vars.less");

const loadEchart = (cb) => {
  require.ensure(
    [],
    (require) => {
      cb(require("./Echart").default);
    },
    "echart"
  );
};

export default class Chart extends UIComponent {
  constructor() {
    super();
    loadEchart((Echart) => {
      this.setState({
        Echart,
      });
    });
  }

  getOption() {
    const { config } = this.props;
    //柱状图数据
    const barOption = {
      color: [style["primary-color"]], // todo 这里的颜色需要充default.less中取@brand-primary
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "xxxx",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };

    return barOption;
  }

  onChartClick = () => {
    this.context.onEvent(this.props.config, "click");
  };

  onChartReadyCallback = () => {
    this.context.onEvent(this.props.config, "ready");
  };

  render() {
    const { config } = this.props;
    const {
      style = {
        height: 400,
        width: "100%",
      },
    } = config;
    return (
      <div className={`${style.prefix}-chart`}>
        <Spin spinning={!this.state.Echart} />
        {this.state.Echart ? (
          <this.state.Echart
            option={this.getOption()}
            style={{ height: style.height, width: style.width }}
            // notMerge={true}
            // lazyUpdate={true}
            //theme="my_theme"
            onChartReady={this.onChartReadyCallback}
            onEvents={{
              click: this.onChartClick,
            }}
            opts={{ renderer: "svg" }}
          />
        ) : null}
      </div>
    );
  }
}
