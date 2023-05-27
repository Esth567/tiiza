import axios from 'axios';
import authHeader from '../helper/authHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

const register = (email, fullName, phone, password, confirmPassword, location) => {
  return axios.post(API_URL + 'register', {
    email,
    fullName,
    phone,
    password,
    confirmPassword,
    location,
  });
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${API_URL}/login`, requestOptions)
    .then((response) => {
      if (response.data.accessToken) {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
}

const verifyEmail = (token) => {
  return axios.post(API_URL + 'customer/validate-otp', {token});
};

const logout = () => {
  AsyncStorage.removeItem('user');
};

function forgotPassword(email) {
  return fetchWrapper.post(`${API_URL}/customer/reset-password`, { email });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.get(`${API_URL}/customer/reset-password/:token`, {
    token,
    password,
    confirmPassword,
  });
}

const sendSmsVerification = async (phoneNumber) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: 'sms',
    });

    const response = await fetch(`${BASE_URL}/customer/validate-sms-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code,
    });

    const response = await fetch(`${API_URL}/customer/validate-sms-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};



export const authServices = {
  register,
  login,
  logout,
  verifyEmail,
  resetPassword,
  forgotPassword,
  sendSmsVerification,
  checkVerification,
};
