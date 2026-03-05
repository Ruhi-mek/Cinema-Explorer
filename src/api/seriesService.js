// Series Service
import apiClient from './apiClient.js';

class SeriesService {
  async getOnTheAir(page = 1) {
    return apiClient.fetch('/tv/on_the_air', { language: 'en-US', page });
  }

  async getTrending() {
    return apiClient.fetch('/trending/tv/week');
  }

  async getPopular(page = 1) {
    return apiClient.fetch('/tv/popular', { language: 'en-US', page });
  }

  async getByGenre(genreId, page = 1) {
    return apiClient.fetch('/discover/tv', { 
      with_genres: genreId, 
      page, 
      language: 'en-US' 
    });
  }
}

export default new SeriesService();
