import React, { Component } from 'react';
import { LineChart, ChartMediator, PublicLegend } from './wdc'

const MAX_INST = 4;
const COLOR_ID = 12345;

class App extends Component {
  constructor() {
    super();

    this.legend = new PublicLegend();
    this.state = {
      realtime: false,
      chartCanvas: [],
      charts: [],
      legend: this.legend.dataset
    }
    this.id = 0;
    this.oids = [];


    this.dataset = this.createDataset();
  }
  componentDidMount() {
    this.mediator = ChartMediator;
    this.legend = new PublicLegend(COLOR_ID);
  }

  createDataset = () => {
    let out = [];
    for (let i = 0; i < MAX_INST; i++) {
      let oid = parseInt(Math.random() * 1000000);
      out.push({
        oid: oid,
        oname: `TC-29-96-8${oid}`,
        data: this.createTimedata(60, 100 / MAX_INST * i, 100 / MAX_INST * (i + 1))
      })

      this.oids.push(oid);
    }

    return out;
  }

  createUpdateDataset = () => {
    let out = [];
    for (let i = 0; i < MAX_INST; i++) {
      out.push({
        oid: this.oids[i],
        oname: `TC-29-96-8${this.oids[i]}`,
        data: this.createTimedata(1, 100 / MAX_INST * i, 100 / MAX_INST * (i + 1))
      })
    }

    return out;
  }

  updateData = () => {
    let that = this;
    this.state.charts.map((chart) => {
      let updateDataset = that.createUpdateDataset();
      chart.updateData(updateDataset);
      that.legend.updateData(updateDataset);
    });

    this.setState({
      legend: this.legend.dataset
    })
  }

  createTimedata = (count, start, end) => {
    let out = [];

    for (let i = count; i > 0; i--) {
      let input = [];
      let time = parseInt(new Date().getTime() / 1000);
      let timestamp = (time * 1000)  - (i * 5 * 1000);
      input.push(timestamp);

      let random = Math.random() * 100;
      if (random < start) random = random + start;
      if (random > end)   random = (random % end) + end;

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
      let lineChart = new LineChart(canvas.props.id, COLOR_ID);
      
      this.mediator.subscribe(lineChart);
      
      lineChart.loadData(this.dataset);
      this.legend.loadData(this.dataset);
      
      this.setState({
        charts: [ ...charts, lineChart ],
        legend: this.legend.dataset
      })
    }
  }

  handleLegendClick = (e, oid) => {
    console.log("Handled Legend Click");
    console.log(oid);
    this.legend.handleClick(oid);
  }

  render() {
    let that = this;
    return (
      <div>
        <div>
          <h2>Control Panel</h2>
          <button onClick={this.handleRealtime}>{this.state.realtime ? "Stop Realtime" : "Start Realtime"}</button>
          <button onClick={this.handleAddChart}>Add Chart</button>
        </div>
        <hr/>
        <div>
          {this.state.legend.map((legend) => {
            return <button onClick={(e) => that.handleLegendClick(e, legend.oid)}>{legend.oname}</button>
          })}
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
