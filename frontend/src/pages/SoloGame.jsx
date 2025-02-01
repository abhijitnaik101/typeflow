import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaClock, FaChartLine, FaPlay, FaRedo, FaTrophy, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import wordsData from '../data/wordsDatabase';
import TypingHeading from '../components/TypingHeading';

// Helper Functions
function getNewWord(category) {
  return wordsData[category][Math.floor(Math.random() * wordsData[category].length)];
}

function calculateWPM(correctTypedWords, time) {
  return Math.round((correctTypedWords / (30 - time)) * 60) || 0;
}

function calculateAccuracy(totalTypedWords, correctTypedWords) {
  return totalTypedWords > 0 ? Math.round((correctTypedWords / totalTypedWords) * 100) : 100;
}

function getRank(score) {
  if (score >= 50) return "Legendary";
  if (score >= 30) return "Expert";
  if (score >= 15) return "Advanced";
  if (score >= 5) return "Beginner";
  return "Novice";
}

// WordLane Component for each word lane
const WordLane = ({ lane, words, handleWordMiss, wordSpeeds }) => {
  return (
    <motion.div
      key={words[lane].key}
      initial={{ x: '-100%' }}
      animate={{
        x: lane === 'easy' ? '750%' :
          lane === 'medium' ? '600%' :
            lane === 'hard' ? '450%' :
              lane === 'special' ? '250%' : '500%'
      }}
      transition={{
        duration: wordSpeeds[lane] * (words[lane].text.length / 5),
        ease: 'linear',
        onComplete: () => handleWordMiss(lane)
      }}
      className={`relative px-4 py-2 text-white rounded-lg shadow-md self-start ${lane === 'easy' ? 'bg-green-500' : lane === 'medium' ? 'bg-yellow-500' : lane === 'hard' ? 'bg-red-500' : lane === 'special' ? 'bg-blue-400 border-2 border-blue-500 animate-neon' : 'blue'}`}
    >
      {words[lane].text}
    </motion.div>
  );
};

// GameHeader Component for displaying score, time, and lives
const GameHeader = ({ time, lives, score }) => (
  <div className="w-full flex justify-between mb-6 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg">

    <p className="flex items-center gap-2 text-lg font-semibold">
      <FaClock size={20} className="animate-spin" />
      <span className="text-xl">{time}s</span>
    </p>


    <p className="flex items-center gap-2 text-lg font-semibold text-rose-500">
      <div className='animate-bouncef'> <FaHeart size={20} className="animate-pulse" /></div>
      <span className="text-xl">{lives}</span>
    </p>


    <p className="flex items-center gap-2 text-lg font-semibold">
      <FaChartLine size={20} className="animate-none" />
      <span className="text-xl">Score: {score}</span>
    </p>
  </div>
);

// GameOver Component for displaying final score and game results
const GameOver = ({ score, calculateWPM, calculateAccuracy, getRank, restartGame }) => (
  <div className="text-center bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg flex flex-col items-center">
    <h3 className="text-3xl font-bold text-red-400">Game Over!</h3>
    <p className="mt-4 text-2xl">Final Score: {score}</p>
    <p className="mt-2 text-xl">WPM: {calculateWPM()}</p>
    <p className="mt-2 text-xl">Accuracy: {calculateAccuracy()}%</p>
    <div className="mt-4 text-lg font-semibold flex justify-center items-center gap-3 text-yellow-300">
      <FaTrophy size={24} /> Rank: {getRank()}
    </div>
    <button onClick={restartGame} className="bg-blue-500 px-6 py-3 rounded-lg mt-6 flex items-center gap-3 text-white hover:bg-blue-600 transition duration-200">
      <FaRedo size={20} /> Restart
    </button>
  </div>
);

// GameControls Component for displaying game control buttons
const GameControls = ({ startGame, time, navigate }) => (
  <div className="text-center flex flex-col items-center ">
    <label className="block mb-4 text-lg text-black">Select Duration:</label>
    <select className="p-3 rounded-lg bg-gray-700 text-white" onChange={(e) => setTime(parseInt(e.target.value))}>
      <option value={30}>30 seconds</option>
      <option value={60}>1 minute</option>
      <option value={120}>2 minutes</option>
    </select>
    <button onClick={() => startGame(time)} className=" bg-green-500 border-4 border-black px-6 py-3 rounded-lg mt-6 flex items-center gap-3 text-black hover:bg-green-600 transition duration-200">
      <FaPlay  /> Start Game
    </button>
    <button onClick={() => navigate('/multiplayer')} className="bg-purple-500 border-4 border-black px-6 py-3 rounded-lg mt-6 flex items-center gap-3 text-black hover:bg-purple-600 transition duration-200">
      <FaUsers  /> Multiplayer
    </button>
  </div>
);

// Main SoloGame Component
const SoloGame = () => {
  const navigate = useNavigate();
  const wordSpeeds = { easy: 8, medium: 10, hard: 8, special: 9 };
  const lanes = ['easy', 'medium', 'hard', 'special'];

  const [words, setWords] = useState(
    lanes.reduce((acc, lane) => ({
      ...acc,
      [lane]: { text: getNewWord(lane), width: 100, key: Math.random() }
    }), {})
  );
  const [typedWord, setTypedWord] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [lives, setLives] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalTypedWords, setTotalTypedWords] = useState(0);
  const [correctTypedWords, setCorrectTypedWords] = useState(0);

  useEffect(() => {
    if (gameActive && time > 0 && lives > 0) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }

    if (time === 0 || lives === 0) {
      setGameActive(false);
      setGameOver(true);
    }
  }, [gameActive, time, lives]);

  function startGame(duration = 30) {
    setScore(0);
    setTypedWord('');
    setTime(duration);
    setLives(10);
    setGameActive(true);
    setGameOver(false);
    setTotalTypedWords(0);
    setCorrectTypedWords(0);
    
    // Ensure new words are generated
    setWords(() =>
      lanes.reduce((acc, lane) => ({
        ...acc,
        [lane]: { text: getNewWord(lane), width: 100, key: Math.random() }
      }), {})
    );
  }
  

  function handleInput(e) {
    const input = e.target.value.trim();
    setTypedWord(input);
    setTotalTypedWords((prev) => prev + 1);

    let foundCategory = lanes.find((lane) => words[lane].text === input);
    if (foundCategory) {
      handleCorrectWord(foundCategory);
      setCorrectTypedWords((prev) => prev + 1);
      e.target.value = '';
      setTypedWord('');
    }
  }

  function handleCorrectWord(category) {
    setScore((prev) => prev + (category === 'easy' ? 1 : category === 'medium' ? 3 : category === 'hard' ? 5 : 7));
    setWords((prev) => ({
      ...prev,
      [category]: { text: getNewWord(category), width: 100, key: Math.random() }
    }));
  }

  function handleWordMiss(category) {
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameActive(false);
        setGameOver(true);
      }
      return Math.max(0, newLives);
    });
    setWords((prev) => ({
      ...prev,
      [category]: { text: getNewWord(category), width: 100, key: Math.random() }
    }));
  }

  return (
    <div className="bg-yellow-400 bg-center bg-cover border-4 border-black w-4xl mx-auto text-white p-8 rounded-xl shadow-xl relative">
      {!gameActive ?
        <TypingHeading /> :
        <h2 className="text-4xl font-bold text-center mb-6 text-black font-mono">
          Solo Typing Test
          <span className="animate-blink">|</span>
        </h2>
      }

      {!gameActive && !gameOver ? (
        <GameControls startGame={startGame} time={time} navigate={navigate} />
      ) : gameOver ? (
        <GameOver
          score={score}
          calculateWPM={() => calculateWPM(correctTypedWords, time)}
          calculateAccuracy={() => calculateAccuracy(totalTypedWords, correctTypedWords)}
          getRank={getRank}
          restartGame={() => startGame(time)}
        />
      ) : (
        <div className='flex flex-col items-center'>
          <GameHeader time={time} lives={lives} score={score} />
          <div className="h-72 flex w-lg flex-col gap-4 items-center justify-center bg-slate-800 rounded-lg overflow-hidden">
            {lanes.map((lane) => (
              <WordLane
                key={lane}
                lane={lane}
                words={words}
                handleWordMiss={handleWordMiss}
                wordSpeeds={wordSpeeds}
              />
            ))}
          </div>
          <div className="mt-6 text-lg">
            <input
              type="text"
              value={typedWord}
              onChange={handleInput}
              className="px-4 py-2 w-full rounded-lg text-black bg-white"
              placeholder="Start typing here..."
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SoloGame;
