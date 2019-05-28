import React, { Component } from 'react';
import { HitmapChart, HitmapChartWrapper } from '../wdc';
import { fakeData } from '../testfile';

export default class HitmapChartDemo extends Component {
  index = 0;
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setInterval(() => {
      this.index++;
      const data = {
        hit: [[Date.now(), fakeData.hit[this.index % fakeData.hit.length - 1][1]]],
        err: [[Date.now(), fakeData.err[this.index % fakeData.err.length - 1][1]]],
      }

      console.log('data ===', data);

      this.setState({
        updateData: data
      })
    }, 5000)
  }

  render() {
    return (
      <div>
        <div style={{ width: '80vw', height: '50vh'}}>
          <HitmapChartWrapper
            data={fakeData}
            options={{hitmap: { isStatic: true }}}
          />
        </div>
        <div style={{ width: '80vw', height: '50vh'}}>
          <HitmapChartWrapper
            data={this.state.updateData}
          />
        </div>
      </div>
    )
  }
}