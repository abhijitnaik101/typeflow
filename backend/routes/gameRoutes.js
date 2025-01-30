const express = require('express');
const {
  createRoom,
  joinRoom,
  startGame,
  updateWord,
  endGame,
} = require('../controllers/gameController');

const router = express.Router();

router.post('/create-room', createRoom);
router.post('/join-room', joinRoom);
router.post('/start-game', startGame);
router.post('/update-word', updateWord);
router.post('/end-game', endGame);

module.exports = router;
