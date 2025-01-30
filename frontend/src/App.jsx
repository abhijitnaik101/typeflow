import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SoloGame from './pages/SoloGame';
import MultiGame from './pages/MultiGame';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Typing Speed and Accuracy Game</h1>
        <Routes>
          <Route path="/" element={<SoloGame />} />
          <Route path="/multiplayer" element={<MultiGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
