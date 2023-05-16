import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.43.95:5000/api/v1/';

const lostItem = (
  item_name,
  item_worth,
  lost_date,
  lost_location,
  phone_number,
  description,
  report_type,
  item_color,
  item_type,
) => {
  return axios.post(API_URL + 'customer/register/lost-item', {
    item_name,
    item_worth,
    lost_date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    item_type,
  });
};


const foundItem = (
  item_name,
  item_worth,
  lost_date,
  lost_location,
  phone_number,
  description,
  report_type,
  item_color,
  item_type
) => {
  return axios.post(API_URL + 'customer/register/found-items', {
    item_name,
    item_worth,
    lost_date,
    lost_location,
    phone_number,
    description,
    report_type,
    item_color,
    item_type,
  });
};


export default {
  lostItem,
  foundItem,
};