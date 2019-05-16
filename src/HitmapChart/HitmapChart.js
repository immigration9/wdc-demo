import React, { Component } from 'react';
import { HitmapChart } from '../wdc'
import { fakeData } from '../testfile';

export default class HitmapChartDemo extends Component {
  componentDidMount() {
    this.hitmapChartStatic = new HitmapChart("hitmapchartstatic", { type: "HitmapChart", yAxis: { tick: { display: true }}, hitmap: { isStatic: true } });
    this.hitmapChartLive = new HitmapChart("hitmapchartlive", { type: "HitmapChart", hitmap: { isStatic: false } });
    this.hitmapChartStatic.loadHitmapData(fakeData);

    // setInterval(() => {

    // }, 5000);
  }

  render() {
    return (
      <div>
        <div>
          <canvas id={"hitmapchartstatic"} width="1200" height="500"/>
        </div>
        <div>
          <canvas id={"hitmapchartlive"} width="1200" height="500"/>
        </div>
      </div>
    )
  }
}