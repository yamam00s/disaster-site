import axios from 'axios';
import apiKey from '../apiKey';

export default async ({lat, lng}) => {
  let result;
  try {
    result = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: apiKey
        }
      }
    );
  } catch(error) {
    result = error.massage;
  }
  return result;
}