import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Arc from './ArcChart/Arc';
import BarChart from './BarChart/BarChart';
import HitmapChart from './HitmapChart/HitmapChart';
import LineChart from './LineChart/LineChart';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<LineChart />, document.getElementById('root'));
// ReactDOM.render(<HitmapChart />, document.getElementById('root'));
// ReactDOM.render(<Arc />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
