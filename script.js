getAnalytics(app);

// Add timestamp to Firebase on button click
document.getElementById("myButton").addEventListener("click", () => {
  const timestamp = new Date().toISOString();
  push(ref(db, "timestamps/"), { time: timestamp })
    .then(() => console.log("Pushed to Firebase:", timestamp))
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
