// Sample dataset
const dataset = [
    { title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3 },
    { title: "The Godfather", year: 1972, genre: "Crime, Drama", rating: 9.2 },
    { title: "The Dark Knight", year: 2008, genre: "Action, Crime, Drama", rating: 9.0 },
    { title: "Pulp Fiction", year: 1994, genre: "Crime, Drama", rating: 8.9 },
    { title: "Schindler's List", year: 1993, genre: "Biography, Drama, History", rating: 9.0 },
    // Add more rows as needed
];

// Populate the table with the dataset
function populateTable() {
    const tbody = document.getElementById("imdbRows");
    tbody.innerHTML = ""; // Clear existing rows
    dataset.forEach(movie => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.genre}</td>
            <td>${movie.rating}</td>
        `;
        tbody.appendChild(row);
    });
}

// Filter the table based on genre
function filterTable() {
    const genreInput = document.getElementById("genreInput").value.toLowerCase();
    const rows = document.querySelectorAll("#imdbRows tr");

    rows.forEach(row => {
        const genre = row.cells[2].innerText.toLowerCase();
        if (genre.includes(genreInput) || genreInput === "") {
            row.style.display = ""; // Show the row
        } else {
            row.style.display = "none"; // Hide the row
        }
    });
}

// Event listener for the filter button
document.getElementById("filterButton").addEventListener("click", filterTable);

// Initialize the table on page load
window.onload = populateTable;
