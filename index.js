const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomInt(max, min) {
  return Math.floor(min + (Math.random() * (max - min + 1)))
}

start();

async function start() {

  console.log("\nLet's play a game where you (human) make up a number and I (computer) try to guess it.\nBefore you choose a number, tell me the range I should guess in.")

  let rangeMin = NaN
  let rangeMax = NaN
  let secretNumber = NaN
  // Variables are set to NaN to help with the type-check loops

  while (isNaN(rangeMin) === true) {
  rangeMin = await ask("Enter the lowest number in the range: ")
  }
  while (isNaN(rangeMax) === true) {
  rangeMax = await ask("Enter the highest number in the range: ")
  }
  while (isNaN(secretNumber) === true) {
  secretNumber = await ask("What is your secret number? I won't peek, I promise...\nEnter your number: ")
  }
  // Starts the game and has the user define the range they want the computer to guess within
  // and what number they want the computer to guess.
  // Uses while loop to make sure user inputs a real number and prevents errors from typos

  rangeMin = parseInt(rangeMin , 10)
  rangeMax = parseInt(rangeMax , 10)
  // Turns the strings of numbers into true numbers

  console.log('\nYou entered: ' + secretNumber + '\nPlease remember your number! I will know if you cheated!');
  console.log("I'll guess a number between " + rangeMin + " and " + rangeMax + ".")

  let userAnswer = 'n' // Stores if the user answers "y" or "n" to the guess, is "n" by default
  let computerGuess = null // Variable for what the computer will guess, is null by default
  let guessNum = 0 //Stores the number of guesses the computer has made, starts at 0

  while (userAnswer != 'y') {
    // Creates a loop to continue until the computer guesses secretNumber

    let rangeSpread = rangeMax - rangeMin // Keeps track of the range of possible numbers. If 0 and answer is still "n", the user is cheating!
    let hiOrLow = null // stores whether the guess is higher or lower than secretNumber, resets for each loop
    let rangeMiddle = Math.round(((rangeSpread) / 2) + rangeMin) // finds the middle of the range for a more efficient guess

    if (guessNum === 0) {
      computerGuess = randomInt(rangeMin, rangeMax)
    } else {
      computerGuess = rangeMiddle
    }
    // The first guess is a random number, and every guess after that is the middle number of the range.

    userAnswer = await ask('\nIs your number ' + computerGuess + '?\nEnter "y" or "n": ');

    guessNum++ // Keeps track of how many guesses the computer has made

    if (rangeSpread === 0 && userAnswer === 'n') {
      while (true){
        console.log('CHEATER!');
      }
    }
    //Checks if user is cheating after their answer, and ruins their terminal if they are

    if (userAnswer === 'n') {
      hiOrLow = await ask('\nIs your number higher or lower?\nEnter "h" or "l": ');

      if (hiOrLow === 'h') {
        rangeMin = computerGuess + 1
      }
      if (hiOrLow === 'l') {
        rangeMax = computerGuess - 1
      }
      // Stores if the number is higher or lower than the guess, and modifies the range accordingly
    }
  }
  console.log('\nYour number is ' + computerGuess + '. I win!\nIt took me ' + guessNum + ' guesses to find your number.')
  // Win message runs once computer guesses the number and the answer is yes and logs the number of guesses it took

  process.exit();
}
