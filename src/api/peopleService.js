// People Service - Single Responsibility: Handle all celebrity-related API calls
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class PeopleService {
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

  async getTrending() {
    return this.fetch('/trending/person/week');
  }

  async getPopular(page = 1) {
    return this.fetch('/person/popular', { language: 'en-US', page });
  }
}

export default new PeopleService();
