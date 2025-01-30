import React, { useState, useEffect } from 'react';
import { FaTrophy, FaClock, FaKeyboard, FaChartLine } from 'react-icons/fa';
import wordsData from '../data/wordsDatabase'; // Import the word categories from the local database

const SoloGame = () => {
  const [easyWords] = useState(wordsData.easy);
  const [mediumWords] = useState(wordsData.medium);
  const [hardWords] = useState(wordsData.hard);

  const [currentWords, setCurrentWords] = useState([]);
  const [typedWord, setTypedWord] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30); // Default timer duration
  const [gameActive, setGameActive] = useState(false);
  const [totalTyped, setTotalTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  useEffect(() => {
    if (gameActive && time > 0) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (time === 0) setGameActive(false);
  }, [gameActive, time]);

  const startGame = (duration) => {
    setScore(0);
    setTypedWord('');
    setTime(duration);
    setTotalTyped(0);
    setCorrectWords(0);
    setGameActive(true);
    generateWords();
  };

  const generateWords = () => {
    const easy = easyWords[Math.floor(Math.random() * easyWords.length)];
    const medium = mediumWords[Math.floor(Math.random() * mediumWords.length)];
    const hard = hardWords[Math.floor(Math.random() * hardWords.length)];
    setCurrentWords([easy, medium, hard]);
  };

  const handleInput = (e) => {
    const input = e.target.value.trim();
    setTypedWord(input);

    if (currentWords.includes(input)) {
      const wordScore =
        easyWords.includes(input)
          ? 1
          : mediumWords.includes(input)
          ? 3
          : hardWords.includes(input)
          ? 5
          : 0; // Fallback in case of unexpected input

      setScore((prev) => prev + wordScore);
      setCorrectWords((prev) => prev + 1);
      generateWords();
      e.target.value = '';
    }
    setTotalTyped((prev) => prev + 1);
  };

  const calculateAccuracy = () => {
    return totalTyped > 0 ? ((correctWords / totalTyped) * 100).toFixed(2) : 0;
  };

  const calculateWPM = () => {
    const minutes = (30 - time) / 60;
    return minutes > 0 ? (correctWords / minutes).toFixed(2) : 0;
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Solo Typing Test</h2>
      {!gameActive ? (
        <div className="mb-4">
          <label htmlFor="timer" className="block mb-2 text-gray-300">
            <FaClock className="inline-block mr-2" /> Select Duration:
          </label>
          <select
            id="timer"
            className="border border-gray-300 rounded p-2 w-full bg-gray-700 text-white"
            onChange={(e) => setTime(parseInt(e.target.value))}
          >
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={120}>2 minutes</option>
          </select>
          <button
            onClick={() => startGame(time)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-4"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <div className="text-lg mb-4">
            <strong className="block mb-2">Words:</strong>
            {currentWords.map((word, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 rounded mx-1 inline-block text-gray-200"
              >
                {word}
              </span>
            ))}
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            autoFocus
          />
          <p className="mt-4">
            <FaChartLine className="inline-block mr-2" /> <strong>Score:</strong> {score}
          </p>
          <p>
            <FaClock className="inline-block mr-2" /> <strong>Time Left:</strong> {time}s
          </p>
        </div>
      )}
      {!gameActive && totalTyped > 0 && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-center">Results</h3>
          <p>
            <FaKeyboard className="inline-block mr-2" /> <strong>WPM:</strong> {calculateWPM()}
          </p>
          <p>
            <FaTrophy className="inline-block mr-2" /> <strong>Score:</strong> {score}
          </p>
          <p>
            <FaChartLine className="inline-block mr-2" /> <strong>Accuracy:</strong> {calculateAccuracy()}%
          </p>
        </div>
      )}
    </div>
  );
};

export default SoloGame;
