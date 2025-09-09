// getAnalytics(app);

/*
  1 - script.js is a module (a file exporting functionality).
  2 - ref, push, and onChildAdded are named exports from that module — specific functions it makes available to you.
  3 - Firebase’s new modular SDK uses named imports like this for better tree-shaking and performance.
  
  Here’s where to find docs:
  
  Firebase Realtime Database (modular)
  📄 https://firebase.google.com/docs/database/web/start
  (Look under the “Modular API” tabs.)
  
  API Reference for firebase-database
  📘 https://firebase.google.com/docs/reference/js/database.md
  (Has full lists of functions like ref, push, onChildAdded, etc.)
  
  Firebase Web Modular SDK Overview
  📚 https://firebase.google.com/docs/web/learn-more#modular-version
*/

import { db, auth } from "./site/firebase.js";
import { ref, get, set } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// now auth is defined here

// Check for Game ID in Firebase on form submission
document.getElementById("rsvpForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const gameId = document.getElementById("gameId").value.trim();

  if (!gameId) {
    alert("Please enter a valid Game ID.");
    return;
  }

  const gameRef = ref(db, `gameIds/${gameId}`);

  try {
    const snapshot = await get(gameRef);
    if (snapshot.exists()) {
      alert("Game ID found.");
      window.location.href = `gameLobby/index.html?gameId=${encodeURIComponent(gameId)}`;
    } else {
      alert("That Game ID can't be found.");
    }
  } catch (error) {
    console.error("Error checking Game ID:", error);
    alert("An error occurred. Please try again.");
  }
});

