import React, { Component } from 'react';
import { LineChart, ChartMediator } from './wdc'

class App extends Component {
  constructor() {
    super();

    this.state = {
      realtime: false,
      chartCanvas: [],
      charts: [],
    }
    this.id = 0;
  }
  componentDidMount() {
    this.mediator = ChartMediator;
  }

  updateData = () => {
    let that = this;
    this.state.charts.map((chart) => chart.updateData(that.createUpdateDataset()))
  }

  createDataset = () => {
    let out = [];
    out.push({ oid: 12345, oname: "TC-29-96-8070", data: this.createTimedata(59, 0, 10)});
    out.push({ oid: 23456, oname: "TC-29-96-8071", data: this.createTimedata(59, 10, 30)});
    out.push({ oid: 34567, oname: "TC-29-96-8072", data: this.createTimedata(59, 30, 50)});
    out.push({ oid: 45678, oname: "TC-29-96-8082", data: this.createTimedata(59, 50, 100)});
    return out;
  }

  createUpdateDataset = () => {
    let out = [];
    out.push({ oid: 12345, oname: "TC-29-96-8070", data: this.createTimedata(0, 0, 10)});
    out.push({ oid: 23456, oname: "TC-29-96-8071", data: this.createTimedata(0, 10, 30)});
    out.push({ oid: 34567, oname: "TC-29-96-8072", data: this.createTimedata(0, 30, 50)});
    out.push({ oid: 45678, oname: "TC-29-96-8082", data: this.createTimedata(0, 50, 100)});
    return out;
  }

  createTimedata = (count, start, end) => {
    let out = [];

    for (let i = count; i >= 0; i--) {
      let input = [];
      let time = parseInt(new Date().getTime() / 1000);
      let timestamp = (time * 1000)  - (i * 5 * 1000);
      input.push(timestamp);

      let random = Math.random() * 100;
      if (random < start) {
        random = random + start;
      }
      if (random > end) {
        random = (random % end) + end;
      }
      input.push(random);

      out.push(input);
    }
    return out;
  }

  handleRealtime = () => {
    let that = this;
    if (this.state.realtime) {
      clearInterval(this.realtime);
    } else {
      this.realtime = setInterval(() => {
        that.updateData();
      }, 5000);
    }
    this.setState({
      realtime: !this.state.realtime
    })
  }

  handleAddChart = () => {
    const { chartCanvas } = this.state;

    let chartId = "test" + (this.id);
    this.id += 1;

    let canvas = <canvas id={chartId} width="450" height="300"/>
    this.setState({
      chartCanvas: [ ...chartCanvas, canvas ]
    })


  }

  componentDidUpdate(prevProps, prevState) {
    const { chartCanvas, charts } = this.state;

    if (prevState.chartCanvas.length !== this.state.chartCanvas.length) {
      let canvas = chartCanvas[chartCanvas.length - 1];
      let lineChart = new LineChart(canvas.props.id);
      
      this.mediator.subscribe(lineChart);
      
      lineChart.loadData(this.createDataset());
      this.setState({
        charts: [ ...charts, lineChart ]
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Control Panel</h2>
          <button onClick={this.handleRealtime}>{this.state.realtime ? "Stop Realtime" : "Start Realtime"}</button>
          <button onClick={this.handleAddChart}>Add Chart</button>
        </div>
        <hr/>
        <div>
          {this.state.chartCanvas.map((chart) => {
            return chart;
          })}
        </div>
      </div>
    );
  }
}

export default App;
