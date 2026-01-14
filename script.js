const params = new URLSearchParams(window.location.search);
const secret = (params.get("word") || "APPLE").toUpperCase();

let currentRow = 0;

const board = document.getElementById("board");

for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  board.appendChild(row);
}

function submitGuess() {
  const input = document.getElementById("guess");
  const guess = input.value.toUpperCase();

  if (guess.length !== 5) {
    alert("Enter exactly 5 letters");
    return;
  }

  const row = board.children[currentRow];
  const secretLetters = secret.split("");

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = guess[i];

    if (guess[i] === secret[i]) {
      tile.classList.add("green");
    } else if (secretLetters.includes(guess[i])) {
      tile.classList.add("yellow");
    } else {
      tile.classList.add("gray");
    }
  }

  if (guess === secret) {
    document.getElementById("message").textContent = "🎉 You won!";
  } else if (currentRow === 5) {
    document.getElementById("message").textContent =
      "❌ Game over! Word was " + secret;
  }

  currentRow++;
  input.value = "";
}
