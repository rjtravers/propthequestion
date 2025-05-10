import { db } from "/propthequestion/site/firebase.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

document.getElementById("form_newGame").addEventListener("submit", (e) => {
  e.preventDefault();

  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("input_newGameId").value.trim();

  if (!gameId) {
    alert("Please enter a Game ID");
    return;
  }

  const gameRef = ref(db, "gameIds/" + gameId);

  // Check if the Game ID already exists
  get(gameRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        alert(`The Game ID "${gameId}" is already in use. Please choose a different one.`);
      } else {
        // Create the game entry
        set(gameRef, { timestamp })
          .then(() => {
            console.log("Game ID created:", gameId);
            alert(`Game "${gameId}" created successfully!`);
          })
          .catch((err) => {
            console.error("Firebase write failed:", err);
            alert("Something went wrong while creating your game. Please try again.");
          });
      }
    })
    .catch((err) => {
      console.error("Firebase read failed:", err);
      alert("A network or database error occurred. Please check your connection and try again.");
    });
