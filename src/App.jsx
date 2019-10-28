import React, { Component } from "react";
import SearchAppBar from './components/SearchAppBar.jsx';
import GoogleMap from './components/GoogleMap.jsx';
import Loading from './components/Loading.jsx';
import './App.css';

import getGeoLocation from './util/getGeoLocation';
import getReverseGeoconding, { parseAddress } from './util/getReverseGeoconding';
import dateFormatter, { parseZeroPadding } from './util/dateFormatter';
import getDisaster from './util/getDisaster';

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
    const reverseGeocondingRes = await getReverseGeoconding({
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    });
    const address = parseAddress(reverseGeocondingRes);
    const today = dateFormatter();
    const disasterData = await getDisaster(address, {
      startDate: `${today.year}-${parseZeroPadding(today.month -1)}-${parseZeroPadding(today.day)}`,
      endDate: `${today.year}-${parseZeroPadding(today.month)}-${parseZeroPadding(today.day)}`
    })

    console.log(disasterData)
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
      <div className="app">
        {/* <Container> */}
          <SearchAppBar />
          <div className="app-contents">
            {this.state.loading ? (
              <div className="app-loading">
                <Loading />
              </div>
            ) : (
              <div className="app-map">
                <GoogleMap lat={this.state.coords.lat} lng={this.state.coords.lng}/>
              </div>
            )}
          </div>
        {/* </Container> */}
      </div>
    );
  }
}
