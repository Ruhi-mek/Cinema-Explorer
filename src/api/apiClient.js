// Base API client - handles all HTTP requests with authentication
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Debug: Log API key status on load
console.log('API Key loaded:', API_KEY ? 'YES (length: ' + API_KEY.length + ')' : 'NO - CHECK .env FILE');
console.log('Environment:', import.meta.env);

class ApiClient {
  async fetch(endpoint, params = {}) {
    // Debug: Check if API key is loaded
    if (!API_KEY) {
      console.error('❌ API Key is missing! Make sure VITE_TMDB_API_KEY is set in .env file');
      console.error('Did you restart the dev server after creating .env?');
      throw new Error('API Key not configured');
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    try {
      console.log('🔄 Fetching:', url);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        console.error('❌ API Error:', response.status, response.statusText);
        const errorData = await response.text();
        console.error('Error details:', errorData);
        throw new Error(`API Error: ${response.status}`);
      }
      
      console.log('✅ API call successful');
      return await response.json();
    } catch (error) {
      console.error('❌ API Fetch Error:', error);
      throw error;
    }
  }
}

export default new ApiClient();
