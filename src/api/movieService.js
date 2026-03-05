// Movie Service
import apiClient from './apiClient.js';

class MovieService {
  async getNowPlaying(page = 1) {
    return apiClient.fetch('/movie/now_playing', { language: 'en-US', page });
  }

  async getTrending() {
    return apiClient.fetch('/trending/movie/week');
  }

  async getPopular(page = 1) {
    return apiClient.fetch('/movie/popular', { language: 'en-US', page });
  }

  async getByGenre(genreId, page = 1) {
    return apiClient.fetch('/discover/movie', { 
      with_genres: genreId, 
      page, 
      language: 'en-US' 
    });
  }
}

export default new MovieService();
