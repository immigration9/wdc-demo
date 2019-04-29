import React, { Component, Fragment } from 'react';
import { ChartWrapper } from '../wdc';
import './BarChart.css';
const HOUR = 1000 * 60 * 60;

const options = {
  xAxis: {
    tick: {
      format: (data) => {
        const date = new Date(data);
        return date.getHours();
      }
    }
  }
}

class Bar extends Component {
  constructor(props){
    super(props);
    
    this.state = {
    }
  }
  componentDidMount(){
    this.setData();
  }

  setData = () => {
    const stime = 1556463600000;
    let data = [];
    for(let i = 0; i < 5; i++){
      const pushData = {
        key: stime + HOUR * i,
        data: [
          {
            id: -1,
            key: 1,
            data: Math.floor(Math.random() * 150),
          },
          // {
          //   id: 2,
          //   key: 2,
          //   data: Math.floor(Math.random() * 150),
          // },
          // {
          //   id: 3,
          //   key: 3,
          //   data: Math.floor(Math.random() * 150),
          // }
        ],
      }
      data.push(pushData);
    }
    this.setState({data: data})
  }

  render(){
    return(
      <div style={{width: '600px', height: '400px'}}>
        <ChartWrapper
          id="1"
          type="BarChart"
          data={this.state.data}
          options={options}
        />
      </div>
    )
  }
}

export default Bar;