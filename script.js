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
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Add timestamp to Firebase on button click
document.getElementById("rsvpForm").addEventListener("submit", () => {
  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("gameId").value;
  push(ref(db, "gameIds/"), { 
        gameId: gameId,
        timestamp: timestamp
      })
    .then(() => console.log("Pushed to Firebase:", gameId ))
    .catch((err) => console.error("Firebase write failed:", err));
});

// Listen for new timestamps and add to DOM
const timestampList = document.getElementById("timestampList");
// const timestampsRef = ref(db, "timestamps/");
// onChildAdded(timestampsRef, (snapshot) => {
//   const data = snapshot.val();
//   const li = document.createElement("li");
//   li.textContent = data.time;
//   timestampList.appendChild(li);
// });

const gameIds = ref(db, "gameIds/");
onChildAdded(gameIds, (snapshot) => {
  const data = snapshot.val();
  const li = document.createElement("li");
  li.textContent = data.gameId;
  timestampList.appendChild(li);
});
