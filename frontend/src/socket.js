import { io } from 'socket.io-client';
// http://localhost:3000
const socket = io('https://typeflow.onrender.com'); // Replace with backend URL if hosted elsewhere
export default socket;
