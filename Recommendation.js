document.getElementById('fetchDataBtn').addEventListener('click', fetchRecommendations);

function fetchRecommendations() {
  const apiUrl = 'http://127.0.0.1:5000/api/recommendations';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Display gross recommendation
      document.getElementById('grossRecommendation').innerText = data.gross_recommendation;

      // Populate Highly Rated table
      const highlyRatedTable = document.getElementById('highlyRatedTable');
      highlyRatedTable.innerHTML = ''; // Clear previous data
      data.highly_rated.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${movie.Series_Title}</td>
          <td>${movie.Genre}</td>
          <td>${movie.IMDB_Rating}</td>
          <td>${movie.Meta_score}</td>
        `;
        highlyRatedTable.appendChild(row);
      });

      // Populate Underrated Gems table
      const underratedGemsTable = document.getElementById('underratedGemsTable');
      underratedGemsTable.innerHTML = ''; // Clear previous data
      data.underrated_gems.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${movie.Series_Title}</td>
          <td>${movie.Genre}</td>
          <td>${movie.IMDB_Rating}</td>
          <td>$${movie.Gross.toLocaleString()}</td>
        `;
        underratedGemsTable.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching recommendations:', error);
    });
}
