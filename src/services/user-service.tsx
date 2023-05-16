import axios from 'axios';
import authHeader from '../helper/auth-header';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};

export default {
  getUserBoard,
};