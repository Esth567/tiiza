import { io } from 'socket.io-client';
const socket = io.connect('http://192.168.43.95:5000/api/v1/');
export default socket;