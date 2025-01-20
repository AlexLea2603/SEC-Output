// Replace with your backend API URL
const API_URL = 'http://127.0.0.1:5000/api/recommendations';

// Fetch data from Flask API
async function fetchRecommendations() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const container = document.getElementById('recommendations-container');
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'recommendation';
            div.innerHTML = `
                <h2>${item.title}</h2>
                <p>Genre: ${item.genre}</p>
                <p>Rating: ${item.rating}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

// Call the function
fetchRecommendations();