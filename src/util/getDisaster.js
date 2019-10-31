import axios from 'axios';

export default (locationStr, {startDate, endDate}) => {
  return axios.get(
    `http://api.aitc.jp/jmardb-api/search?datetime=${startDate}&datetime=${endDate}&areaname=${locationStr}`
  ).catch(error => error)
}
