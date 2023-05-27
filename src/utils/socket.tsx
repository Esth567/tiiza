import { io } from "socket.io-client";
const socket = io.connect('http://localhost:5000/api/v1/');
export default socket;