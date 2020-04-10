import axios from 'axios';

//change according to your system
axios.default.withCredentials = true;
export default axios.create({
  // baseURL : 'http://localhost:5001/api'
  baseURL : 'http://localhost:5001/api',
  withCredentials : true,
  crossDomain: true
})