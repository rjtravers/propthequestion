const params = new URLSearchParams(window.location.search);
const gameId = params.get("gameId");

if (gameId) {
  console.log("Game ID:", gameId);
  // Use it however you want, e.g. display it or use in Firebase calls
} else {
  console.warn("No Game ID found in query params.");
}
