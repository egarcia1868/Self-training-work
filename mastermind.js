'use strict';

const assert = require('assert');
// const colors = require('colors/safe');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = [];
let solution = '';
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
  console.log(solution)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//^^if min is always going to be 0, doesn't that make adding min to this unnecessary?


function generateHint(guess, solution) {
  // your code here
  let numSuper = 0;
  let numCorrect = 0;
  let splSolution = solution.split('');
  let splGuess = guess.split('');

  for (let i = 0; i < 4; i++) {
    if (splSolution[i] === splGuess[i]) {
      numSuper++;
    }
    if (splSolution.includes(splGuess[i])) {
      numCorrect++;
    }
  }
  return `${numSuper}-${numCorrect-numSuper}`;
}

function mastermind(guess) {
  // your code here
  if (guess !== solution) {
    board.push(`${guess} ${generateHint(guess, solution)}`);
  } else {
    return ('You guessed it!');
  }
}

function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log(mastermind(guess));
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
