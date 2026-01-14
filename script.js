// ===== Get the secret word from URL (Base64) =====
const params = new URLSearchParams(window.location.search);
const encodedWord = params.get("word");

// Decode it if exists, otherwise null
const secret = encodedWord ? atob(encodedWord).toUpperCase() : null;

// ===== DOM elements =====
const guessSection = document.getElementById("guessSection");
const board = document.getElementById("board");

// Hide guessing section if no secret word in URL
if (!secret) {
  guessSection.style.display = "none";
} else {
  guessSection.style.display = "block";

  // Create the 6x5 board
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
}

let currentRow = 0;

// ===== Submit a guess =====
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

// ===== Generate Base64 link for a secret word =====
function generateLink() {
    const secretInput = document.getElementById("secretInput").value.toUpperCase();
  
    if (secretInput.length !== 5) {
      alert("Enter exactly 5 letters for the secret word.");
      return;
    }
  
    // Encode the word in Base64
    const encoded = btoa(secretInput);
  
    // Generate full shareable URL
    const fullUrl = `${window.location.origin}${window.location.pathname}?word=${encoded}`;
  
    // Display it in the read-only input field
    const linkInput = document.getElementById("generatedLink");
    linkInput.value = fullUrl;
    linkInput.select(); // optional: automatically highlight the text
    document.execCommand("copy"); // optional: automatically copy to clipboard
    alert("Link generated and copied to clipboard!");
  }
  