// Card Component - Single Responsibility: Display content cards
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export class Card {
  renderMovie(movie) {
    return `
      <div class="card">
        <img src="${IMAGE_BASE_URL}${movie.poster_path}" 
             alt="${movie.title}" 
             class="card-image" />
        <div class="card-content">
          <h3 class="card-title">${movie.title}</h3>
          <div class="card-meta">
            <span class="card-rating">⭐ ${movie.vote_average?.toFixed(1)}</span>
            <span class="card-date">${movie.release_date?.split('-')[0] || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderSeries(series) {
    return `
      <div class="card">
        <img src="${IMAGE_BASE_URL}${series.poster_path}" 
             alt="${series.name}" 
             class="card-image" />
        <div class="card-content">
          <h3 class="card-title">${series.name}</h3>
          <div class="card-meta">
            <span class="card-rating">⭐ ${series.vote_average?.toFixed(1)}</span>
            <span class="card-date">${series.first_air_date?.split('-')[0] || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderPerson(person) {
    return `
      <div class="card card-person">
        <img src="${PROFILE_BASE_URL}${person.profile_path}" 
             alt="${person.name}" 
             class="card-image" />
        <div class="card-content">
          <h3 class="card-title">${person.name}</h3>
          <p class="card-known-for">${person.known_for_department || ''}</p>
        </div>
      </div>
    `;
  }
}
