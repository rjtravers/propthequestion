import { db } from "/propthequestion/site/firebase.js";
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Add timestamp to Firebase on button click
document.getElementById("form_newGame").addEventListener("submit", () => {
  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("input_newGameId").value;
  push(ref(db, "gameIds/"), { 
        gameId: gameId,
        timestamp: timestamp
      })
    .then(() => console.log("Pushed to Firebase:", gameId ))
    .catch((err) => console.error("Firebase write failed:", err));
});

// Listen for new Game IDs and display them
const existingGameIds = document.getElementById("existingGameIds");
const gameIdsRef = ref(db, "gameIds/");

onChildAdded(gameIdsRef, (snapshot) => {
  const gameId = snapshot.key;
  const data = snapshot.val();
  const li = document.createElement("li");
  li.textContent = `${gameId} — ${data.timestamp}`;
  existingGameIds.appendChild(li);
});
