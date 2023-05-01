
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

const register = (fullName, email, phone, password, confirmPassword, location) => {
  return axios.post(API_URL + 'register', {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    location,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + 'login', {
      email,
      password,
    });
  if (response.data.accessToken) {
    AsyncStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const verifyEmail  = async (token) => {
  try {
    const { data } = await axios.post(API_URL + '/customer/validate-otp', { token });
    return data;
  } catch(error) {
    return catchError(error);
  }
}

const logout = () => {
  AsyncStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
