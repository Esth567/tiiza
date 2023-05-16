import axios from 'axios';
import authHeader from '../helper/auth-header';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

const getDashboard = () => {
  return axios.get(API_URL + 'customer/dashboard', { headers: authHeader() });
};

export default {
  getDashboard,
};