import React, { useState, useEffect } from 'react';
import socket from '../socket';
import { FaTrophy } from 'react-icons/fa';

const MultiGame = () => {
  const [room, setRoom] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isLeader, setIsLeader] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedTime, setSelectedTime] = useState(30);
  const [words, setWords] = useState([]);
  const [typedWord, setTypedWord] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    socket.on('roomJoined', ({ players, isLeader }) => {
      setPlayers(players);
      setIsLeader(isLeader);
    });

    socket.on('updatePlayers', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on('startGame', ({ words, timer }) => {
      setWords(words);
      setTimer(timer);
      setGameStarted(true);
    });

    socket.on('updateWords', ({ newWords, scores }) => {
      setWords(newWords);
      const playerScore = scores[socket.id]?.score || 0;
      setScore(playerScore);
    });

    socket.on('gameOver', ({ winners, scores, speeds }) => {
      const results = Object.keys(scores).map((id) => ({
        name: scores[id].name,
        score: scores[id].score,
        speed: speeds[id],
      }));
      results.sort((a, b) => b.score - a.score);
      setRankings(results);
      setShowResults(true);
      resetGame();
    });

    return () => {
      socket.off('roomJoined');
      socket.off('updatePlayers');
      socket.off('startGame');
      socket.off('updateWords');
      socket.off('gameOver');
    };
  }, []);

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0 && gameStarted) {
      socket.emit('endGame', { room });
    }
  }, [gameStarted, timer]);

  const handleJoinRoom = () => {
    if (room.trim() && playerName.trim()) {
      socket.emit('joinRoom', { room, name: playerName });
    }
  };

  const handleStartGame = () => {
    socket.emit('startGame', { room, duration: selectedTime });
  };

  const handleInput = (e) => {
    const input = e.target.value.trim();
    setTypedWord(input);

    const matchedWord = words.find((w) => w.word === input);
    if (matchedWord) {
      socket.emit('wordTyped', { room, word: input, timeTaken: 1 }); // Replace with actual time taken
      e.target.value = '';
    }
  };

  const resetGame = () => {
    setRoom('');
    setPlayerName('');
    setPlayers([]);
    setWords([]);
    setScore(0);
    setTypedWord('');
    setIsLeader(false);
    setGameStarted(false);
    setTimer(0);
  };

  const getWordColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      case 'special':
        return 'text-blue-500';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Multiplayer Typing Test</h2>

      {!gameStarted && !showResults ? (
        <div className="mb-4">
          <h3 className="text-xl mb-4">Join or Create a Room</h3>
          <input
            type="text"
            placeholder="Enter Room Name"
            className="border border-gray-500 p-2 rounded-lg w-full mb-2 bg-gray-900 text-white"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            className="border border-gray-500 p-2 rounded-lg w-full mb-2 bg-gray-900 text-white"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>

          {players.length > 0 && (
            <>
              <h3 className="text-xl mb-4">Players in Room</h3>
              <ul className="list-disc pl-5 mb-4">
                {players.map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </>
          )}

          {isLeader && (
            <>
              <h3 className="text-xl mb-4">Set Game Timer</h3>
              <select
                className="border border-gray-500 p-2 rounded-lg w-full mb-4 bg-gray-900 text-white"
                value={selectedTime}
                onChange={(e) => setSelectedTime(parseInt(e.target.value, 10))}
              >
                {[30, 60, 90, 120].map((time) => (
                  <option key={time} value={time}>
                    {time} seconds
                  </option>
                ))}
              </select>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            </>
          )}
        </div>
      ) : gameStarted ? (
        <div>
          <h3 className="text-lg mb-4">
            <strong>Timer:</strong> {timer}s
          </h3>
          <h3 className="text-lg mb-4">
            <strong>Score:</strong> {score}
          </h3>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-lg">
              <strong>Words:</strong>{' '}
              {words.map((wordObj, idx) => (
                <span key={idx} className={`${getWordColor(wordObj.difficulty)} mx-2`}>
                  {wordObj.word}
                </span>
              ))}
            </p>
          </div>
          <input
            type="text"
            className="border border-gray-500 p-2 rounded-lg w-full mb-4 bg-gray-900 text-white"
            placeholder="Type the word here"
            onChange={handleInput}
            autoFocus
          />
        </div>
      ) : showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-center mb-4">Game Over!</h3>
            <ul className="divide-y divide-gray-300">
              {rankings.map((player, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <div className="flex items-center">
                    {index === 0 && (
                      <span className="text-yellow-500 text-lg font-bold mr-2">🏆</span>
                    )}
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="mr-4">Score: {player.score}</span>
                    <span>Speed: {player.speed} WPM</span>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
              onClick={() => setShowResults(false)}
            >
              Close
            </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default MultiGame;
