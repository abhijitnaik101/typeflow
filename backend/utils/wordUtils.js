const words = require('../words/words.json').words;

const generateWords = (count) => {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

module.exports = { generateWords };
