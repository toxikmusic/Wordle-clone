//** Word list
const wordList = ["apple", "grape", "peach", "mango", "lemon", "berry", "melon", "cherry", "guava", "plums"];

//** Fisher-Yates shuffle to randomize the word list
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//** Shuffle the word list and select the first word as the target
shuffle(wordList);
var targetWord = wordList[0];
console.log("Target word (for debugging):", targetWord);

const maxAttempts = 6;
let attempts = 0;

const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");

//** Create empty tiles for the game board
for (let i = 0; i < maxAttempts * 5; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  gameBoard.appendChild(tile);
}

submitButton.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== 5) {
    message.textContent = "Guess must be 5 letters!";
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = "Game over! The word was " + targetWord.toUpperCase();
    return;
  }

  const startIdx = attempts * 5;
  const tiles = Array.from(gameBoard.children).slice(startIdx, startIdx + 5);

  // ... (your existing code)

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    const tile = tiles[i];
    tile.textContent = letter;

    if (letter === targetWord[i]) {
      tile.classList.add("correct");
    } else {
      let letterCount = 0;
      for (let j = 0; j < targetWord.length; j++) {
        if (targetWord[j] === letter) {
          letterCount++;
        }
      }
      // Only add "present" if the letterCount is greater than 0
      if (letterCount >= 1) {
        tile.classList.add("present");
      } else {
        tile.classList.add("absent");
      }
    }
  }

  attempts++;
  guessInput.value = "";

  if (guess === targetWord) {
    message.textContent = "Congratulations! You guessed the word!";
    submitButton.disabled = true;
  } else if (attempts === maxAttempts) {
    message.textContent = "Game over! The word was " + targetWord.toUpperCase();
  }
});

function resetGame() {
  attempts = 0;
  currentGuess = '';
  currentRow = 0;
  currentTile = 0;
  message.textContent = '';
  submitButton.disabled = false;
  // Reset the game board tiles
  for (let i = 0; i < maxAttempts * 5; i++) {
    const tile = gameBoard.children[i];
    tile.textContent = '';
    tile.classList.remove("correct");
    tile.classList.remove("present");
    tile.classList.remove("absent");
  }
  // Shuffle the word list again
  shuffle(wordList);
  targetWord = wordList[0];
  console.log("Target word (for debugging):", targetWord);
}
function toggleDarkMode() {
  const darkMode = document.querySelector('body');
  if (darkMode.classList.contains('dark-mode')) {
    darkMode.classList.remove('dark-mode');
  } else {
    darkMode.classList.add('dark-mode');
  }
}