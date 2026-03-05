// Home Page - Single Responsibility: Homepage logic and rendering
import movieService from '../api/movieService.js';
import seriesService from '../api/seriesService.js';
import peopleService from '../api/peopleService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';

export class HomePage {
  constructor() {
    this.hero = null;
    this.card = new Card();
  }

  async render() {
    const content = document.getElementById('content');
    
    try {
      content.innerHTML = `
        <section class="hero" id="hero-section"></section>
        
        <section class="content-section">
          <h2 class="section-title">Trending Movies</h2>
          <div class="card-grid" id="trending-movies"></div>
        </section>

        <section class="content-section">
          <h2 class="section-title">Trending Series</h2>
          <div class="card-grid" id="trending-series"></div>
        </section>

        <section class="content-section">
          <h2 class="section-title">Trending People</h2>
          <div class="card-grid" id="trending-people"></div>
        </section>
      `;

      const [nowPlaying, trendingMovies, trendingSeries, trendingPeople] = await Promise.all([
        movieService.getNowPlaying(),
        movieService.getTrending(),
        seriesService.getTrending(),
        peopleService.getTrending()
      ]);

      this.hero = new Hero('hero-section');
      this.hero.render(nowPlaying.results, 'movie');
      
      this.card.renderMovies(trendingMovies.results.slice(0, 6), 'trending-movies');
      this.card.renderSeries(trendingSeries.results.slice(0, 6), 'trending-series');
      this.card.renderPeople(trendingPeople.results.slice(0, 6), 'trending-people');
      
    } catch (error) {
      console.error('Error loading homepage:', error);
      content.innerHTML = '<div class="error">Failed to load content. Please check your API key.</div>';
    }
  }

  attachEvents() {
    // Events are attached in components
  }
}
