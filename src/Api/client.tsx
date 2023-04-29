import axios from "axios";

const client = axios.create({
  baseURL: 'http://192.168.43.95:5000/api',
});

export default client;