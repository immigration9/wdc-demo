import React, { Component } from 'react';
import { ChartWrapperV2 } from '../wdc';

const Instance = ["TC-29-96-825", "TC-29-96-824", "TC-29-96-823", "TC-29-96-822", "TC-29-96-821"]

export default class LineChartDemo extends Component {
  index = 0;
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        updateData: [],
      })
    }, 5000)
  }

  render() {
    return (
      <div>
        <div style={{ width: '80vw', height: '50vh'}}>
          <ChartWrapperV2
            type="LineChart"
          />
        </div>
        <div style={{ width: '80vw', height: '50vh'}}>          
        </div>
      </div>
    )
  }
}