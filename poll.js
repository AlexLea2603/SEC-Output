import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3uzOEiSmHmSZ96xd2pDMDttMxuHezGBI",
  authDomain: "contacts-database-b26e4.firebaseapp.com",
  databaseURL: "https://contacts-database-b26e4-default-rtdb.firebaseio.com",
  projectId: "contacts-database-b26e4",
  storageBucket: "contacts-database-b26e4.appspot.com",
  messagingSenderId: "717772121564",
  appId: "1:717772121564:web:e4400e0dadf40a5b8f9b19",
  measurementId: "G-NE88YCNMGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the Films section in the database
const filmsRef = ref(database, "Films");

// When the submit button is clicked, save the data
const btn = document.getElementById("submit-data");
btn.addEventListener("click", saveFilmRating);

function saveFilmRating() {
  const filmField = document.getElementById("Film");
  const ratingField = document.getElementById("Rating");
  const moodField = document.getElementById("Mood");
  const genreField = document.getElementById("Genre");
  const commentsField = document.getElementById("Comments");

  const filmName = filmField.value;
  const filmRating = ratingField.value;
  const filmMood = moodField.value;
  const filmGenre = genreField.value;
  const extraComments = commentsField.value;

  if (!filmName || !filmRating || !filmGenre) {
    alert("Please fill out all fields.");
    return;
  }

  filmField.value = "";
  ratingField.value = "";
  moodField.value = "";
  genreField.value = "";
  commentsField.value = "";

  const newFilmRef = push(filmsRef);
  set(newFilmRef, {
    Film: filmName,
    Rating: filmRating,
    Mood: filmMood,
    Genre: filmGenre,
    Comments: extraComments,
  });

  alert("Film, Rating, Type of Film, Genre, and Comments saved successfully!");
}

// Display data from Firebase as a table
onChildAdded(filmsRef, (data) => {
  const datapoint = data.val();

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${datapoint.Film}</td>
    <td>${datapoint.Rating}</td>
    <td>${datapoint.Genre}</td>
    <td>${datapoint.Mood}</td>
    <td>${datapoint.Comments}</td>
  `;
  document.getElementById("rows").appendChild(newRow);
});

// Filter the table
function filterTable() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const tableRows = document.querySelectorAll("#rows tr");

  tableRows.forEach(row => {
    const film = row.cells[0].innerText.toLowerCase();
    const rating = row.cells[1].innerText.toLowerCase();
    const mood = row.cells[2].innerText.toLowerCase();
    const genre = row.cells[3].innerText.toLowerCase();

    if (film.includes(searchInput) || rating.includes(searchInput) || mood.includes(searchInput) || genre.includes(searchInput)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
