import { db } from "/propthequestion/site/firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("gameId");

if (gameId) {
  const gameRef = ref(db, "gameIds/" + gameId);

  get(gameRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Game data:", data);
  
        document.getElementById("gameIdDisplay").textContent = data.bride + " & " + data.groom + "'s"
        
      } else {
        console.warn("Game ID not found in database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching game data:", error);
    });

  } else {
    console.warn("No Game ID found in query params.");
}

document.getElementById("submitPropSheet").addEventListener("click", function() {
  console.log('clicked!');
  window.location.href = `./submitPropSheet/index.html?gameId=${encodeURIComponent(gameId)}`;
});
