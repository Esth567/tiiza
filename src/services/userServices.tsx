import axios from 'axios';
import authHeader from '../helper/authHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

function lostItem(user) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/customer/register/lost-item/${user.id}`, requestOptions)
};

function foundItem(user) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/customer/register/found-items/${user.id}`, requestOptions).then();
}

const fetchFoundItem = () => {
  return axios.get(API_URL + 'fetch/found-items', { headers: authHeader() });
};

const fetchLostItem = () => {
  return axios.get(API_URL + 'fetch/lost-items', { headers: authHeader() });
};

export const userServices = {
  lostItem,
  foundItem,
  fetchFoundItem,
  fetchLostItem,
};
