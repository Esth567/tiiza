import axios from 'axios';

const API_URL = 'http://192.168.43.95:5000/api';

const register = (fullName, email, phone, password, confirmPassword, location) => {
  return axios.post(API_URL + 'v1/register', {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    location,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'v1/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
