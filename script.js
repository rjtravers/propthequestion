// getAnalytics(app);

import { db } from './site/firebase.js';
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Add timestamp to Firebase on button click
document.getElementById("rsvpForm").addEventListener("submit", () => {
  const timestamp = new Date().toISOString();
  const gameId = document.getElementById("gameId").value;
  push(ref(db, "gameIds/"), { gameId: gameId })
    .then(() => console.log("Pushed to Firebase:", gameId ))
    .catch((err) => console.error("Firebase write failed:", err));
});

// Listen for new timestamps and add to DOM
const timestampList = document.getElementById("timestampList");
const timestampsRef = ref(db, "timestamps/");
onChildAdded(timestampsRef, (snapshot) => {
  const data = snapshot.val();
  const li = document.createElement("li");
  li.textContent = data.time;
  timestampList.appendChild(li);
});
