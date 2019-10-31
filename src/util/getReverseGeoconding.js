import axios from 'axios';
import apiKey from '../apiKey';

export default ({lat, lng}) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        latlng: `${lat},${lng}`,
        key: apiKey
      }
    }
  ).catch(error => error)
}

export const parseAddress = (reverseGeocondingRes) => {
  return reverseGeocondingRes.data.results[0].address_components[4].short_name
}
