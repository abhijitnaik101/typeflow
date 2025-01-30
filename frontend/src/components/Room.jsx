import React, { useState } from 'react';

const Room = ({ onJoinRoom }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = () => {
    if (name.trim() && room.trim()) {
      onJoinRoom({ name, room });
    }
  };

  return (
    <div className="room-form">
      <h3>Enter Room Details</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default Room;
