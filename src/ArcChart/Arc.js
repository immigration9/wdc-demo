import React, { Component, Fragment } from 'react';
import { ChartWrapper } from '../wdc';
import './Arc.css';

class Arc extends Component {
  constructor(){
    super();

    this.state = {
      data: [],
    }
  }
  componentDidMount(){
    this.setData();
    setInterval(() => {
      this.setData();
    }, 5000)
  }

  setData = () => {
    this.setState({
      data:[
        {
          id: '1',
          key: '1',
          data: Math.random(),
        },
        {
          id: '2',
          key: '2',
          data: Math.random(),
        },
        {
          id: '3',
          key: '3',
          data: Math.random(),
        },
        {
          id: '4',
          key: '4',
          data: Math.random(),
        },

      ]
    })
  }
  render(){
    const { data } = this.state;
    return(
      <Fragment>
        <div className="wrapper canvasWrapper">
          <ChartWrapper
            id="test"
            type={'ArcChart'}
            options={{title: 'active sessions'}}
            data={[
              {
                id: '1',
                key: '1',
                data: 43,
              },
              {
                id: '2',
                key: '2',
                data: 20,
              },
              {
                id: '3',
                key: '3',
                data: 30,
              },
              {
                id: '4',
                key: '4',
                data: 60,
              },
              {
                id: '5',
                key: '5',
                data: 32,
              },
              {
                id: '6',
                key: '6',
                data: 32,
              },
              {
                id: '7',
                key: '7',
                data: 32,
              },
              {
                id: '8',
                key: '8',
                data: 32,
              },
            ]}
          />
        </div>
        <div className="wrapper canvasWrapper">
          <ChartWrapper
            id="move_test"
            type={'ArcChart'}
            options={{title: 'active sessions'}}
            data={data}
          />
        </div>
        <div className="wrapper canvasWrapper">
          <ChartWrapper
            id="testestas"
            type={'ArcChart'}
            options={{title: 'active sessions', semiCircle: true}}
          />
        </div>
        <div className="autoHeightWrapper canvasWrapper">
        <ChartWrapper
          id="test2"
          type={'ArcChart'}
          options={{semiCircle: true}}
          data={[
            {
              id: '1',
              key: '1',
              data: 30,
            },
            {
              id: '2',
              key: '2',
              data: 123,
            },
            {
              id: '3',
              key: '3',
              data: 41.2,
            },
            {
              id: '4',
              key: '4',
              data: 82.4,
            },
          ]}
        />
        </div>
        <div className="autoHeightWrapper canvasWrapper">
        <ChartWrapper
          id="test3"
          type={'ArcChart'}
          options={{title: '텍스트 줄 바꿈 테스트 진행합니다. 진행을 흐 흐 흡니 까아악'}}
          data={[
            {
              id: '1',
              key: '1',
              data: 0,
            },
            {
              id: '2',
              key: '2',
              data: 0,
            },
            {
              id: '3',
              key: '3',
              data: 0,
            },
            {
              id: '4',
              key: '4',
              data: 0,
            },
          ]}
        />
        </div>
      </Fragment>
    )
  }
}

export default Arc;