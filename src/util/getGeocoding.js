import axios from 'axios';
import apiKey from '../apiKey';

export default (address) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address: address,
        key: apiKey
      }
    }
  ).catch(error => error)
}

export const parseLocation = (geocondingRes) => {
  return {
    lat: geocondingRes.data.results[0].geometry.location.lat,
    lng: geocondingRes.data.results[0].geometry.location.lng
  }
}