import React, { Component } from "react";
import { Card } from "antd";
import ReactEchartsCore from "echarts-for-react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventory: [15, 25, 56, 20, 50, 50],
  };
  getOption = () => {
    const { sales, inventory } = this.state;
    return {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: sales,
        },
        {
          name: "库存",
          type: "bar",
          data: inventory,
        },
      ],
    };
  };
  render() {
    return (
      <Card title="柱状图">
        <ReactEchartsCore
          echarts={echarts}
          option={this.getOption()}
          style={{ height: 300 }}
        />
      </Card>
    );
  }
}
