import React, { Component } from "react";
import SearchAppBar from './components/SearchAppBar.jsx';
import GoogleMap from './components/GoogleMap.jsx';
import Loading from './components/Loading.jsx';
import SimpleTable from './components/SimpleTable.jsx';
import './App.css';

// util
import getGeoLocation from './util/getGeoLocation';
import getDisaster from './util/getDisaster';
import getGeocoding, { parseLocation } from './util/getGeocoding';
import getReverseGeoconding, { parseAddress } from './util/getReverseGeoconding';
import dateFormatter, { parseZeroPadding } from './util/dateFormatter';

export default class App extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
      loading: true,
      coords: {
        lat: -1.2884,
        lng: 36.8233
      },
      disasterData: []
    }
  }


  initApp = async ({lat, lng}, address) => {
    const today = dateFormatter();
    const disasterData = await getDisaster(address, {
      startDate: `${today.year}-${parseZeroPadding(today.month -1)}-${parseZeroPadding(today.day)}`,
      endDate: `${today.year}-${parseZeroPadding(today.month)}-${parseZeroPadding(today.day)}`
    })
    this.setState({
      coords: {
        lat: lat,
        lng: lng
      },
      disasterData: disasterData.data.data,
      loading: false
    });
  }

  onSearch = async (address) => {
    this.setState({
      loading: true
    });
    const geocondingRes = await getGeocoding(address)
    const geoLocation = await parseLocation(geocondingRes)
    this.initApp({
      lat: geoLocation.lat,
      lng: geoLocation.lng
    }, address)
  };

  async componentDidMount() {
    const geoLocation = await getGeoLocation();
    const reverseGeocondingRes = await getReverseGeoconding({
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    });
    const address = parseAddress(reverseGeocondingRes);
    this.initApp({
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    }, address)
  }

  render() {
    return (
      <div className="app">
        <SearchAppBar event={this.onSearch}/>
        <div className="app-contents">
          {this.state.loading ? (
            <div className="app-loading">
              <Loading />
            </div>
          ) : (
            <div>
              <SimpleTable rows={this.state.disasterData}/>
              <div className="app-map">
                <GoogleMap lat={this.state.coords.lat} lng={this.state.coords.lng}/>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
