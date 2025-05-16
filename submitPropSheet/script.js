import { db } from "/propthequestion/site/firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("gameId");

if (!gameId) {
  console.error("No gameId found in query string.");
} else {
  const questionsRef = ref(db, "questions");

  get(questionsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const questions = snapshot.val();
        const container = document.getElementById("questionsContainer");

        Object.entries(questions).forEach(([qid, question]) => {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `
            <label>${question.text}</label><br>
            <input type="radio" name="${qid}" value="yes"> Yes
            <input type="radio" name="${qid}" value="no"> No
            <br><br>
          `;
          container.appendChild(wrapper);
        });
      } else {
        console.warn("No questions found in database.");
      }
    })
    .catch((err) => {
      console.error("Error loading questions:", err);
    });
}
