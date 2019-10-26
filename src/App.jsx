import React, { Component } from "react";
import GoogleMap from './components/GoogleMap.jsx';
import './App.css';

import getGeoLocation from './util/getGeoLocation';
// import getDisaster from './util/getDisaster';

// window.addEventListener('DOMContentLoaded', async () => {
//   const currentPosition = await getGeoLocation();
//   const disasterData = await getDisaster('桜島', {
//     startDate: '2013-01-01',
//     endDate: '2013-02-01'
//   })
//   console.log(currentPosition)
// });

export default class App extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
      loading: true,
      coords: {
        lat: -1.2884,
        lng: 36.8233
      }
    }
  }

  async componentDidMount() {
    const geoLocation = await getGeoLocation();
    this.setState({
      coords: {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude
      },
      loading: false
    });
  }

  render() {
    return (
      <div>
        {this.loading ? (
          <p>loading...</p>
        ) : (
          <div className="app-map">
            <GoogleMap lat={this.state.coords.lat} lng={this.state.coords.lng}/>
          </div>
        )}
      </div>
    );
  }
}
