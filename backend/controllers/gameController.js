const { generateWords } = require('../utils/wordUtils');

let rooms = {}; // Store room data

const createRoom = (req, res) => {
  const { roomName, playerName } = req.body;

  if (rooms[roomName]) {
    return res.status(400).json({ message: 'Room already exists' });
  }

  rooms[roomName] = {
    players: [{ name: playerName, score: 0 }],
    words: [],
    timer: 0,
    isGameActive: false,
  };

  res.status(200).json({ message: 'Room created successfully', room: roomName });
};

const joinRoom = (req, res) => {
  const { roomName, playerName } = req.body;

  if (!rooms[roomName]) {
    return res.status(404).json({ message: 'Room not found' });
  }

  rooms[roomName].players.push({ name: playerName, score: 0 });
  res.status(200).json({ message: 'Joined room successfully', room: roomName });
};

const startGame = (req, res) => {
  const { roomName, timer } = req.body;

  if (!rooms[roomName]) {
    return res.status(404).json({ message: 'Room not found' });
  }

  const playerCount = rooms[roomName].players.length;
  const wordCount = playerCount + 2;

  rooms[roomName].words = generateWords(wordCount);
  rooms[roomName].timer = timer;
  rooms[roomName].isGameActive = true;

  res.status(200).json({ message: 'Game started', words: rooms[roomName].words });
};

const updateWord = (req, res) => {
  const { roomName, typedWord, playerName } = req.body;

  if (!rooms[roomName] || !rooms[roomName].isGameActive) {
    return res.status(404).json({ message: 'Room not found or game inactive' });
  }

  const wordIndex = rooms[roomName].words.indexOf(typedWord);
  if (wordIndex !== -1) {
    rooms[roomName].words.splice(wordIndex, 1, generateWords(1)[0]);

    const player = rooms[roomName].players.find((p) => p.name === playerName);
    if (player) player.score += typedWord.length;

    return res.status(200).json({
      message: 'Word updated',
      words: rooms[roomName].words,
      players: rooms[roomName].players,
    });
  }

  res.status(400).json({ message: 'Word not found in the room' });
};

const endGame = (req, res) => {
  const { roomName } = req.body;

  if (!rooms[roomName]) {
    return res.status(404).json({ message: 'Room not found' });
  }

  rooms[roomName].isGameActive = false;

  const winner = rooms[roomName].players.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  res.status(200).json({ message: 'Game over', winner, players: rooms[roomName].players });
};

module.exports = { createRoom, joinRoom, startGame, updateWord, endGame };
