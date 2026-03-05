// Genre Service - Single Responsibility: Handle all genre-related API calls
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class GenreService {
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

  async getMovieGenres() {
    return this.fetch('/genre/movie/list', { language: 'en' });
  }

  async getTVGenres() {
    return this.fetch('/genre/tv/list', { language: 'en' });
  }
}

export default new GenreService();
