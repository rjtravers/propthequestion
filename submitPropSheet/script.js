import { db } from "/propthequestion/site/firebase.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("gameId");

if (!gameId) {
  console.error("No gameId found in query string.");
} else {
  const gameQuestionsRef = ref(db, `gameIds/${gameId}/questions`);
  const allQuestionsRef = ref(db, "questions");

  // Get the question IDs for this game
  get(gameQuestionsRef)
    .then((gameSnap) => {
      if (!gameSnap.exists()) {
        throw new Error(`No questions configured for gameId ${gameId}`);
      }

      const gameQuestionIds = Object.keys(gameSnap.val());

      // Now fetch all questions
      return get(allQuestionsRef).then((allSnap) => {
        if (!allSnap.exists()) {
          throw new Error("No questions exist in the database.");
        }

        const allQuestions = allSnap.val();
        const container = document.getElementById("questionsContainer");

        gameQuestionIds.forEach((qid) => {
          const question = allQuestions[qid];
          if (!question) return; // Skip missing questions

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `
            <label>${question.text}</label><br>
            <input type="radio" name="${qid}" value="yes"> Yes
            <input type="radio" name="${qid}" value="no"> No
            <br><br>
          `;
          container.appendChild(wrapper);
        });
      });
    })
    .catch((err) => {
      console.error("Error loading game questions:", err.message);
    });
}
