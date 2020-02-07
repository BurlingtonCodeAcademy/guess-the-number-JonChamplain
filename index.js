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

  let rangeMin = parseInt(await ask("Enter the lowest number in the range: "), 10)
  let rangeMax = parseInt(await ask("Enter the highest number in the range: "), 10)
  let secretNumber = await ask("What is your secret number? I won't peek, I promise...\nEnter your number: ");
  console.log('\nYou entered: ' + secretNumber + '\nPlease remember your number! I will know if you cheated!');
  console.log("I'll guess a number between " + rangeMin + " and " + rangeMax + ".")
  // Starts the game and has the user define the range they want the computer
  // to guess within, and then define the number they want the computer to guess.
  // Uses parseInt to make sure we don't get strings of numbers

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
      console.log('\nCHEATER!'.repeat(100))
      process.exit();
    }
    //Checks if user is cheating after their answer, and exits the program if they are

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
