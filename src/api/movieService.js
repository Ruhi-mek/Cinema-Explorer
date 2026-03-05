// Movie Service - Single Responsibility: Handle all movie-related API calls
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class MovieService {
  async fetch(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    const response = await fetch(url, options);
    return await response.json();
  }

  async getNowPlaying(page = 1) {
    return this.fetch('/movie/now_playing', { language: 'en-US', page });
  }

  async getTrending() {
    return this.fetch('/trending/movie/week');
  }

  async getPopular(page = 1) {
    return this.fetch('/movie/popular', { language: 'en-US', page });
  }

  async getByGenre(genreId, page = 1) {
    return this.fetch('/discover/movie', { 
      with_genres: genreId, 
      page, 
      language: 'en-US' 
    });
  }
}

export default new MovieService();
