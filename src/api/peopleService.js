// People Service - Single Responsibility: Handle all celebrity-related API calls
import apiClient from './apiClient.js';

class PeopleService {
  async getTrending() {
    return apiClient.fetch('/trending/person/week');
  }

  async getPopular(page = 1) {
    return apiClient.fetch('/person/popular', { language: 'en-US', page });
  }
}

export default new PeopleService();
