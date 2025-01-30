import React from 'react';

const Stats = ({ score, wordsTyped, accuracy }) => {
  return (
    <div className="stats">
      <h4>Stats</h4>
      <p>Score: {score}</p>
      <p>Words Typed: {wordsTyped}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};

export default Stats;
