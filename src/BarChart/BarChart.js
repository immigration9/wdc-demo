import React, { Component, Fragment } from 'react';
import { ChartWrapper } from '../wdc';
import './BarChart.css';
const HOUR = 1000 * 60 * 60;

// const data = [
//   {
//     key: 1556463600000,
//     data: []
//   },
// ]

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
    for(let i = 0; i < 24; i++){
      const pushData = {
        key: stime + HOUR * i,
        data: [
          {
            id: 1,
            key: 1,
            data: Math.floor(Math.random() * 10),
          },
          {
            id: 2,
            key: 2,
            data: Math.floor(Math.random() * 10),
          },
          {
            id: 3,
            key: 3,
            data: Math.floor(Math.random() * 10),
          }
        ]
      }
      data.push(pushData);
    }
    this.setState({data: data})
  }

  render(){
    console.log('data ===', this.state.data);
    return(
      <div style={{width: '600px', height: '400px'}}>
        <ChartWrapper
          id="1"
          type="BarChart"
          data={this.state.data}
        />
      </div>
    )
  }
}

export default Bar;