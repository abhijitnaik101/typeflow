import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with backend URL if hosted elsewhere
export default socket;
