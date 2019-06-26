import React, { Component } from 'react';
import { HitmapChart, HitmapChartWrapper } from '../wdc';
import { fakeData } from '../testfile';

export default class HitmapChartDemo extends Component {
  index = 0;
  constructor(props){
    super(props);
    this.state = {
      options: {hitmap: { isStatic: false }},
      data: fakeData,
    };

  }
  componentDidMount() {
    setInterval(() => {
      this.index++;
      let now = Date.now();
      const time = now - (now % 5000) - (1000 * 60 * 10) + (this.index * 5000);
      // console.log('this.index ===', this.index);
      if(this.index > 125){
        this.index = 0;
      }
      const data = {
        // hit: [[Date.now() - 1000 * 60 * 85, fakeData.hit[this.index % fakeData.hit.length - 1][1]]],
        // err: [[Date.now() - 1000 * 60 * 85, fakeData.err[this.index % fakeData.err.length - 1][1]]],
        hit: [[time, fakeData.hit[this.index % (fakeData.hit.length - 1)][1]]],
        err: [[time, fakeData.err[this.index % (fakeData.err.length - 1)][1]]],
      }

      this.setState({
        data: data
      })
    }, 50)

    setTimeout(() => {
      this.setState({
        // options: { common: { postRender: { startTime: Date.now() - 1000 * 60 * 132, endTime: Date.now() }} }
      })
    },5000)
  }

  render() {
    return (
      <div>
        <div style={{ width: '800px', height: '350px'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        {/* <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div>
        <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.data}
            options={this.state.options}
            cookieId="dashboard.hitmap"
          />
        </div> */}
        {/* <div style={{ width: '100vw', height: '10vh'}}>
          <HitmapChartWrapper
            data={this.state.updateData}
            cookieId="cookieTest"
          />
        </div> */}
      </div>
    )
  }
}