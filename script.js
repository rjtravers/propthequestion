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

import { db } from "/propthequestion/site/firebase.js";
import { ref, set, get, child, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Add Game ID to Firebase on form submission
document.getElementById("rsvpForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("gameId").value.trim();

  if (!gameId) {
    alert("Please enter a valid Game ID.");
    return;
  }

  const gameRef = ref(db, `gameIds/${gameId}`);

  try {
    const snapshot = await get(gameRef);
    if (snapshot.exists()) {
      alert("Game ID already exists.");
    } else {
      await set(gameRef, { timestamp });
      console.log("Game ID added:", gameId);
      alert("Game ID successfully created.");
    }
  } catch (error) {
    console.error("Error accessing Firebase:", error);
    alert("There was an error. Please try again.");
  }
});

// Listen for new Game IDs and display them
const timestampList = document.getElementById("timestampList");
const gameIdsRef = ref(db, "gameIds/");

onChildAdded(gameIdsRef, (snapshot) => {
  const gameId = snapshot.key;
  const data = snapshot.val();
  const li = document.createElement("li");
  li.textContent = `${gameId} — ${data.timestamp}`;
  timestampList.appendChild(li);
});

