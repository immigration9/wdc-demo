import React, { Component } from 'react';
import { LineChart, ChartMediator, HitmapChart, PublicLegend, ChartWrapper, PublicLegendWrapper } from './wdc'
import { fakeData } from './testfile';

const MAX_INST = 5;
const COLOR_ID = 12345;

const options = {
  yAxis: {
    // maxValue: 100,
    fixedMax: false,
    textPosition: 'inner',
    tick: {
      borderWidth: 5,
    },
    horizontalLine: [
      {
        value: 40,
        color: "red",
        title: "error",
      },
    ]
  }
}

class App extends Component {
  constructor() {
    super();

    this.legend = new PublicLegend();
    this.state = {
      realtime: false,
      chartCanvas: [],
      charts: [],
      legend: [],
      reactChartCanvas: [],
      updateDataset: [],
      reactUpdateDataset: [],
    }
    this.id = 0;
    this.oids = [];
    this.reactOids = [];

    this.dataset = this.createDataset();

    this.reactDataset = this.createDatasetReact();
    this.mediator = ChartMediator;
  }

  componentDidMount() {
    this.legend = new PublicLegend(COLOR_ID);
    
    this.hitmapChart = new HitmapChart("hitmapchart", { type: "HitmapChart", hitmap: { isStatic: true } });
    this.hitmapChart.loadData(fakeData);
    this.hitmapChart.drawChart();
  }

  createDataset = () => {
    let out = [];
    for (let i = 0; i < MAX_INST; i++) {
      let oid = parseInt(Math.random() * 100);
      out.push({
        id: oid,
        key: oid,
        label: `TC-29-96-8${oid}`,
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
        id: this.oids[i],
        key: this.oids[i],
        label: `TC-29-96-8${this.oids[i]}`,
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
      that.legend.loadData(updateDataset);
    });

    this.setState({
      legend: this.legend.dataset
    })
  }

  updateDataReact = () => {
    let dataset = this.createUpdateDatasetReact();
    this.legend.loadData(dataset);

    this.setState({
      reactUpdateDataset: dataset,
      legend: this.legend.dataset
    });
  }

  createTimedata = (count, start, end) => {
    let out = [];

    for (let i = 0; i < count; i++) {
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
      clearInterval(this.realtimeReact);
    } else {
      this.realtime = setInterval(() => {
        that.updateData();
      }, 5000);

      this.realtimeReact = setInterval(() => {
        that.updateDataReact();
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

  createDatasetReact = () => {
    let out = [];
    for (let i = 0; i < MAX_INST; i++) {
      let oid = parseInt(Math.random() * 100);
      out.push({
        id: oid,
        key: oid,
        label: `TC-29-96-8${oid}`,
        data: this.createTimedata(30, 10.0 / MAX_INST * i, 100 / MAX_INST * (i + 1))
      })
      this.reactOids.push(oid);
    }
    return out;
  }

  createUpdateDatasetReact = () => {
    let out = [];
    for (let i = 0; i < MAX_INST; i++) {
      out.push({
        id: this.reactOids[i],
        key: this.reactOids[i],
        label: `TC-29-96-8${this.reactOids[i]}`,
        data: this.createTimedata(1, 100 / MAX_INST * i, 100 / MAX_INST * (i + 1))
      })
    }

    return out;
  }

  componentDidUpdate(prevProps, prevState) {
    const { chartCanvas, charts } = this.state;

    if (prevState.chartCanvas.length !== this.state.chartCanvas.length) {
      let canvas = chartCanvas[chartCanvas.length - 1];
      let lineChart = new LineChart(canvas.props.id, options);
      
      // this.mediator.subscribe(lineChart);
      
      lineChart.loadData(this.dataset);
      this.legend.loadData(this.dataset);
      
      this.setState({
        charts: [ ...charts, lineChart ],
        legend: this.legend.dataset
      })
    }
  }

  handleLegendClick = (e, oid) => {
    this.legend.handleClick(oid);
  }

  handleAddReactChart = () => {
    const { reactChartCanvas } = this.state;

    let chart = 1
    this.setState({
      reactChartCanvas: reactChartCanvas.concat(chart)
    })
  }

  render() {
    let that = this;
    return (
      <div>
        <div style={{ padding: '10px' }}>
          <h2>Control Panel</h2>
          <button onClick={this.handleRealtime}>{this.state.realtime ? "Stop Realtime" : "Start Realtime"}</button>
          <button onClick={this.handleAddChart}>Add Line Chart</button>
          <button onClick={this.handleAddReactChart}>Add React-Wrapper Line Chart</button>
        </div>
        <hr/>
        <div style={{ minHeight: '30px' }}>
          {this.state.legend.map((legend) => {
            return <button onClick={(e) => that.handleLegendClick(e, legend.id)}>{legend.label}</button>
          })}
        </div>
        <div>
          <canvas id={"hitmapchart"} width="1200" height="600" />
        </div>
        <hr/>
        <div>
          {this.state.chartCanvas.map((chart) => {
            return chart;
          })}
        </div>
        <hr/>
        <div>
          <PublicLegendWrapper data={this.reactDataset} updateData={this.state.reactUpdateDataset}/>
        </div>
        <hr/>
        <div>
          {/* <ChartWrapper id={"test" + parseInt(Math.random() * 1000)} mediator={this.mediator} data={this.reactDataset} updateData={this.state.reactUpdateDataset} type='LineChart' showLegend={false} colorId={COLOR_ID} /> */}
          { this.state.reactChartCanvas.map((wr) => {
            return (
              <div style={{ display: 'inline-block', width: '600px', height: '300px'}}>
                <ChartWrapper id={"test" + parseInt(Math.random() * 1000)} data={this.reactDataset} updateData={this.state.reactUpdateDataset} type='LineChart' showLegend={false} options={options} theme="bk"/>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
