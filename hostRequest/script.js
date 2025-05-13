
import { db } from "/propthequestion/site/firebase.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

document.getElementById("form_newGame").addEventListener("submit", (e) => {
  e.preventDefault();

  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("input_newGameId").value.trim();
  const gamePassword = document.getElementById("input_newGamePassword").value.trim();

  if (!gameId) {
    alert("Please enter a Game ID");
    return;
  }

  if (!gamePassword) {
    alert("Please enter a game password");
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
        set(gameRef, { 
            timestamp: timestamp,
            gamePassword: gamePassword
        })
          .then(() => {
            console.log("Game ID created:", gameId);
            alert(`Game "${gameId}" created successfully!`);
            window.location.href = `questions.html?gameId=${encodeURIComponent(gameId)}`;
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

    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("gameId");
    
    if (gameId) {
      console.log("The Game ID pulled from the query string params is:", gameId);
      // Use it however you want, e.g. display it or use in Firebase calls
    } else {
      console.warn("No Game ID found in query params.");
    } 
});
