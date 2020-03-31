import axios from 'axios';

//change according to your system
export default axios.create({
  // baseURL : 'http://localhost:5001/api'
  baseURL : 'http://192.168.0.105:5001/api'

})