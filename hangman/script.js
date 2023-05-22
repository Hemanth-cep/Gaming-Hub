// List of words for the game
const words = ["hangman", "javascript", "programming", "computer", "game", "openai", "code"];

// Select a random word from the list
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Initialize variables for tracking game state
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

// Display underscores for each letter in the selected word
let wordDisplay = "_".repeat(selectedWord.length);

// Display the initial game state
const wordDisplayElement = document.getElementById("wordDisplay");
const incorrectGuessesElement = document.getElementById("incorrectGuesses");

wordDisplayElement.textContent = wordDisplay;
incorrectGuessesElement.textContent = incorrectGuesses;

// Function to check the player's guess
function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();

    if (guessedLetters.includes(guess)) {
        document.querySelector("h1").textContent = "You already guessed that letter!";
    } else {
        guessedLetters.push(guess);

        if (selectedWord.includes(guess)) {
            updateWordDisplay(guess);
            document.querySelector("h1").textContent = "Good guess!";
        } else {
            incorrectGuesses++;
            incorrectGuessesElement.textContent = incorrectGuesses;
            document.querySelector("h1").textContent = "Wrong guess!";
            checkGameStatus();
        }
    }

    guessInput.value = "";
    guessInput.focus();
}

// Function to update the word display with the correctly guessed letter
function updateWordDisplay(guess) {
    let updatedWordDisplay = "";

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
            updatedWordDisplay += guess;
        } else {
            updatedWordDisplay += wordDisplay[i];
        }
    }

    wordDisplay = updatedWordDisplay;
    wordDisplayElement.textContent = wordDisplay;

    checkGameStatus();
}

// Function to check the game status (win/loss)
function checkGameStatus() {
    if (wordDisplay === selectedWord) {
        document.getElementById("message").textContent = "Congratulations! You guessed the word correctly!";
        disableInput();
    } else if (incorrectGuesses === maxIncorrectGuesses) {
        document.getElementById("message").textContent = "Game over! You ran out of guesses. The word was: " + selectedWord;
        disableInput();
    }
}

// Function to disable the input field and guess button
function disableInput() {
    const guessInput = document.getElementById("guessInput");
    const guessButton = document.querySelector("button");

    guessInput.disabled = true;
    guessButton.disabled = true;
}
