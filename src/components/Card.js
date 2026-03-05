// Card Component - Single Responsibility: Display content cards
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
const PLACEHOLDER_PROFILE = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Photo';

export class Card {
  renderMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = movies.map(movie => `
      <div class="card">
        <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : PLACEHOLDER_IMAGE}" 
             alt="${movie.title}" 
             class="card-image" 
             onerror="this.src='${PLACEHOLDER_IMAGE}'" />
        <div class="card-content">
          <h3 class="card-title">${movie.title}</h3>
          <div class="card-meta">
            <span class="card-rating">⭐ ${movie.vote_average?.toFixed(1)}</span>
            <span class="card-date">${movie.release_date?.split('-')[0] || ''}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderSeries(series, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = series.map(item => `
      <div class="card">
        <img src="${item.poster_path ? IMAGE_BASE_URL + item.poster_path : PLACEHOLDER_IMAGE}" 
             alt="${item.name}" 
             class="card-image" 
             onerror="this.src='${PLACEHOLDER_IMAGE}'" />
        <div class="card-content">
          <h3 class="card-title">${item.name}</h3>
          <div class="card-meta">
            <span class="card-rating">⭐ ${item.vote_average?.toFixed(1)}</span>
            <span class="card-date">${item.first_air_date?.split('-')[0] || ''}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderPeople(people, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = people.map(person => `
      <div class="card card-person">
        <img src="${person.profile_path ? PROFILE_BASE_URL + person.profile_path : PLACEHOLDER_PROFILE}" 
             alt="${person.name}" 
             class="card-image" 
             onerror="this.src='${PLACEHOLDER_PROFILE}'" />
        <div class="card-content">
          <h3 class="card-title">${person.name}</h3>
          <p class="card-known-for">${person.known_for_department || ''}</p>
        </div>
      </div>
    `).join('');
  }
}
