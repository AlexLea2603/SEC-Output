
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3uzOEiSmHmSZ96xd2pDMDttMxuHezGBI",
  authDomain: "contacts-database-b26e4.firebaseapp.com",
  databaseURL: "https://contacts-database-b26e4-default-rtdb.firebaseio.com",
  projectId: "contacts-database-b26e4",
  storageBucket: "contacts-database-b26e4.appspot.com",
  messagingSenderId: "717772121564",
  appId: "1:717772121564:web:e4400e0dadf40a5b8f9b19",
  measurementId: "G-NE88YCNMGR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Films section in the database
const myDBCxn = firebase.database().ref("/Films");

// When the submit button is clicked, save the data
const btn = document.getElementById("submit-data");
btn.addEventListener("click", saveFilmRating);

function saveFilmRating() {
  // Get values from input fields
  const filmField = document.getElementById("Film");
  const ratingField = document.getElementById("Rating");
  const genreField = document.getElementById("Genre");
  const commentsField = document.getElementById("Comments");
  const watchAgainField = document.getElementById("WatchAgain");

  const filmName = filmField.value;
  const filmRating = ratingField.value;
  const filmGenre = genreField.value;
  const extraComments = commentsField.value;
  const wouldWatchAgain = watchAgainField.value === "Yes";  // Convert to Boolean (true/false)


  // Validate that the rating is a number (integer or float)
  if(isNaN(filmRating)) {
    alert(' Film Rating must be just a number');
    return;
}

if(filmRating < 0) {
    alert('Film Rating must be a positive number');
    return;
}
 
  


  // Simple validation
  if (!filmName || !filmRating || !filmGenre) {
    alert("Please fill out all fields.");
    return;
  }



  // Reset the form fields after submission
  filmField.value = "";
  ratingField.value = "";
  genreField.value = "";
  commentsField.value = "";
  watchAgainField.value = "Yes";  // Reset the "Would you watch it again?" field to "Yes"

  // Save the data to Firebase
  const data = myDBCxn.push();
  data.set({
    Film: filmName,
    Rating: filmRating,
    Genre: filmGenre,
    Comments: extraComments,
    WatchAgain: wouldWatchAgain  // Store the Boolean value
  });

  alert("Film, Rating, Genre, Would you watch it again, and Comments saved successfully!");
}

// Display data from Firebase as a table (rows and columns)
myDBCxn.on("child_added", displayDataInTable);

function displayDataInTable(data) {
  const datapoint = data.val();

  // Create a new row for the table
  const newRow = document.createElement("tr");

  // Create new cells for each field
  const filmCell = document.createElement("td");
  filmCell.innerText = datapoint.Film;
  newRow.appendChild(filmCell);

  const ratingCell = document.createElement("td");
  ratingCell.innerText = datapoint.Rating;
  newRow.appendChild(ratingCell);

  const genreCell = document.createElement("td");
  genreCell.innerText = datapoint.Genre;
  newRow.appendChild(genreCell);

  const watchAgainCell = document.createElement("td");
  watchAgainCell.innerText = datapoint.WatchAgain ? "Yes" : "No";  // Display "Yes" or "No"
  newRow.appendChild(watchAgainCell);

  const commentsCell = document.createElement("td");
  commentsCell.innerText = datapoint.Comments;
  newRow.appendChild(commentsCell);


  // Append the new row to the table body
  document.getElementById("rows").appendChild(newRow);
}

// Filter the table based on search input
function filterTable() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const tableRows = document.querySelectorAll("#rows tr");

  tableRows.forEach(row => {
    const film = row.cells[0].innerText.toLowerCase();
    const rating = row.cells[1].innerText.toLowerCase();
    const WatchAgain = row.cells[2].innerText.toLowerCase();
    const genre = row.cells[3].innerText.toLowerCase();

    if (film.includes(searchInput) || rating.includes(searchInput) || WatchAgain.includes(searchInput) || genre.includes(searchInput)) {
      row.style.display = ""; // Show row if it matches search
    } else {
      row.style.display = "none"; // Hide row if it doesn't match
    }
  });
}
