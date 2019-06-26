import React, { Component } from 'react';
import { HitmapChartWrapper } from '../wdc';
import { fakeData, fakeData2, fakeData3, fakeData4, fakeData5, fakeData6 } from '../testfile';

const options = {
  hitmap: {
    isStatic: true,
    autoScale: true,
  }
}
export default class HitmapAutoScale extends Component {

  render() {
    return (
      <div>
        <div style={{width: '50%', height: '100vh', display: 'inline-block'}}>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id={"left1"}
              options={options}
              data={fakeData}
            />
          </div>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id={"left2"}
              options={options}
              data={fakeData2}
            />
          </div>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id={"left3"}
              options={options}
              data={fakeData3}
            />
          </div>
        </div>
        <div style={{width: '50%', height: '100vh', display: 'inline-block'}}>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id="right1"
              options={options}
              data={fakeData4}
            />
          </div>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id="right2"
              options={options}
              data={fakeData5}
            />
          </div>
          <div style={{width: '100%', height: '33%'}}>
            <HitmapChartWrapper
              id="right3"
              options={options}
              data={fakeData6}
            />
          </div>
        </div>
      </div>
    )
  }
}