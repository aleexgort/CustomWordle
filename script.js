const params = new URLSearchParams(window.location.search);
const secret = (params.get("word") || "APFEL").toUpperCase();

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
  const secretLetters = secret.split(""); // mutable copy
  const guessLetters = guess.split("");
  const result = Array(5).fill(""); // store color for each tile

  // 1️⃣ First pass: mark greens
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === secretLetters[i]) {
      result[i] = "green";
      secretLetters[i] = null; // remove letter from availability
    }
  }

  // 2️⃣ Second pass: mark yellows
  for (let i = 0; i < 5; i++) {
    if (!result[i]) { // not green
      const index = secretLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = "yellow";
        secretLetters[index] = null; // remove used letter
      } else {
        result[i] = "gray";
      }
    }
  }

  // 3️⃣ Apply colors to tiles
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = guessLetters[i];
    tile.classList.add(result[i]);
  }

  // 4️⃣ Check win / game over
  if (guess === secret) {
    document.getElementById("message").textContent = "🎉 You won!";
  } else if (currentRow === 5) {
    document.getElementById("message").textContent =
      "❌ Game over! Word was " + secret;
  }

  currentRow++;
  input.value = "";
}
