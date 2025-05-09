// firebase.js (must be a module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

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
const db = getDatabase(app);

export { db };
