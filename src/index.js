import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import getGeoLocation from './util/getGeoLocation';
import getDisaster from './util/getDisaster';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('DOMContentLoaded', async () => {
  const currentPosition = await getGeoLocation();
  const disasterData = await getDisaster('桜島', {
    startDate: '2013-01-01',
    endDate: '2013-02-01'
  })
  console.log(currentPosition);
  console.log(disasterData);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
