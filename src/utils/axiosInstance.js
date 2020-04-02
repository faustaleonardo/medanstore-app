import axios from 'axios';

export default axios.create({
  baseURL: 'http://medanstore.herokuapp.com'
});
