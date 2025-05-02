<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
  import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBe0YiLRSwk_qQujDG_f3aY_8nI9H_b1jc",
    authDomain: "prop-the-question.firebaseapp.com",
    databaseURL: "https://prop-the-question-default-rtdb.firebaseio.com",
    projectId: "prop-the-question",
    storageBucket: "prop-the-question.firebasestorage.app",
    messagingSenderId: "699122354312",
    appId: "1:699122354312:web:61e45226b38bb4cf72773d",
    measurementId: "G-F7LQ277HDM"
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  const db = getDatabase(app);

  // Add timestamp to Firebase on button click
  document.getElementById("myButton").addEventListener("click", () => {
    const timestamp = new Date().toISOString();
    push(ref(db, "timestamps/"), { time: timestamp })
      .then(() => console.log("Pushed to Firebase:", timestamp))
      .catch((err) => console.error("Firebase write failed:", err));
  });



  // Add gameID to db
  document.getElementById("rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
  
    const gameId = document.getElementById("gameId").value.trim();
    if (!gameId) return alert("Please enter a Game ID.");
  
    push(ref(db, "rsvps/"), { gameId: gameId, timestamp: new Date().toISOString() })
      .then(() => {
        console.log("RSVP saved:", gameId);
        document.getElementById("gameId").value = ""; // Clear the field
      })
      .catch((err) => {
        console.error("Error writing RSVP:", err);
      });
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
</script>
