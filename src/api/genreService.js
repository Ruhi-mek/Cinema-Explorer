// Genre Service
import apiClient from './apiClient.js';

class GenreService {
  async getMovieGenres() {
    return apiClient.fetch('/genre/movie/list', { language: 'en' });
  }

  async getTVGenres() {
    return apiClient.fetch('/genre/tv/list', { language: 'en' });
  }
}

export default new GenreService();
