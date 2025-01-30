const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

// Word categories
const wordCategories = require('./words/wordCategories');

// Function to generate a set of 3 random words with their difficulty levels
const generateWords = () => {
  const easyWord = {
    word: wordCategories.easy[Math.floor(Math.random() * wordCategories.easy.length)],
    difficulty: 'easy',
  };
  const mediumWord = {
    word: wordCategories.medium[Math.floor(Math.random() * wordCategories.medium.length)],
    difficulty: 'medium',
  };
  const hardWord = {
    word: wordCategories.hard[Math.floor(Math.random() * wordCategories.hard.length)],
    difficulty: 'hard',
  };
  const specialWord = {
    word: wordCategories.special[Math.floor(Math.random() * wordCategories.special.length)],
    difficulty: 'special',
  };

  // Collect words from each category
  const categories = [easyWord, mediumWord, hardWord, specialWord];

  // Shuffle the array to get random order
  for (let i = categories.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categories[i], categories[j]] = [categories[j], categories[i]];
  }

  // Return the first three unique words
  return categories.slice(0, 3);
};

// Rooms data
const rooms = {};

io.on('connection', (socket) => {
  // Join room or create a new room
  socket.on('joinRoom', ({ room, name }) => {
    if (!rooms[room]) {
      rooms[room] = { players: [], leader: socket.id, scores: {}, speeds: {} };
    }

    rooms[room].players.push({ id: socket.id, name });
    rooms[room].scores[socket.id] = { name, score: 0 };
    rooms[room].speeds[socket.id] = 0; // Initialize typing speed
    socket.join(room);

    const isLeader = rooms[room].leader === socket.id;
    io.to(room).emit('updatePlayers', rooms[room].players);
    socket.emit('roomJoined', { players: rooms[room].players, isLeader });
  });

  // Start game
  socket.on('startGame', ({ room, duration }) => {
    if (!rooms[room]) return;

    const words = generateWords(); // Generate initial set of 3 words
    io.to(room).emit('startGame', { words, timer: duration });
  });

  // Word typed event
  socket.on('wordTyped', ({ room, word, timeTaken }) => {
    if (!rooms[room]) return;

    // Update score and speed
    const scoreIncrement = word.length;
    rooms[room].scores[socket.id].score += scoreIncrement;
    rooms[room].speeds[socket.id] = Math.round((scoreIncrement / timeTaken) * 60); // Words per minute

    const newWords = generateWords(); // Generate a new set of 3 words
    io.to(room).emit('updateWords', { newWords, scores: rooms[room].scores, speeds: rooms[room].speeds });
  });

  // End game
  socket.on('endGame', ({ room }) => {
    if (!rooms[room]) return;

    const scores = rooms[room].scores;
    const maxScore = Math.max(...Object.values(scores).map((s) => s.score));
    const winners = Object.values(scores).filter((p) => p.score === maxScore);

    io.to(room).emit('gameOver', { winners, scores, speeds: rooms[room].speeds });
    delete rooms[room]; // Clear room data after game ends
  });

  // Handle player disconnect
  socket.on('disconnect', () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter((p) => p.id !== socket.id);
      delete rooms[room].scores[socket.id];
      delete rooms[room].speeds[socket.id];
      io.to(room).emit('updatePlayers', rooms[room].players);

      // If room is empty, delete it
      if (rooms[room].players.length === 0) {
        delete rooms[room];
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
