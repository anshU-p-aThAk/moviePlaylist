const input = document.querySelector('.inp');
const resultsContainer = document.querySelector('.results');
const userId = document.querySelector('#userId').value;

input.addEventListener('input', () => {
  if (input.value.trim() !== "") {
    fetch(`https://www.omdbapi.com/?apikey=6f97ed96&s=${input.value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response error ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        displayResults(data.Search);
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ', error);
      });
  } else {
    resultsContainer.innerHTML = ''; 
  }
});

function displayResults(movies) {
  resultsContainer.innerHTML = ''; 

  if (movies) {
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');

      const moviePoster = movie.Poster !== "N/A" ? movie.Poster : 'default_poster.jpg';

      movieDiv.innerHTML = `
        <img src="${moviePoster}" alt="${movie.Title}" class="movie-poster">
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <p>Type: ${movie.Type}</p>
          <button class="add-to-lib">Add to Lib</button>
        </div>
      `;

      const addButton = movieDiv.querySelector('.add-to-lib');
      addButton.addEventListener('click', () => addToLibrary(movie, addButton));

      resultsContainer.appendChild(movieDiv);
    });
  } else {
    resultsContainer.innerHTML = '<p>No results found.</p>';
  }
}

function addToLibrary(movie, button) {
  console.log('Adding movie to library:', movie);
  fetch('/addtolib', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      type: movie.Type
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response error ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Movie added to library:', data);
    button.textContent = 'Added';
    button.style.backgroundColor = 'green';
    button.disabled = true;
  })
  .catch(error => {
    console.log('There has been a problem with your fetch operation: ', error);
  });
}
