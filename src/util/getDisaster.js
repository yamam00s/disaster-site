import axios from 'axios';

export default async (locationStr, {startDate, endDate}) => {
  let result;
  try {
    result = await axios.get(
      `http://api.aitc.jp/jmardb-api/search
        ?datetime=${startDate}datetime=${endDate}
        &areaname=${locationStr}`
    ).res;
  } catch(error) {
    result = error.massage;
  }
  return result;
}
