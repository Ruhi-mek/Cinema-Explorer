// Home Page - Single Responsibility: Homepage logic and rendering
import movieService from '../api/movieService.js';
import seriesService from '../api/seriesService.js';
import peopleService from '../api/peopleService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';

export class HomePage {
  constructor() {
    this.hero = new Hero();
    this.card = new Card();
  }

  async render() {
    try {
      const [nowPlaying, trendingMovies, trendingSeries, trendingPeople] = await Promise.all([
        movieService.getNowPlaying(),
        movieService.getTrending(),
        seriesService.getTrending(),
        peopleService.getTrending()
      ]);

      return `
        ${this.hero.render(nowPlaying.results, 'movie')}
        
        <section class="content-section">
          <h2 class="section-title">Trending Movies</h2>
          <div class="card-grid">
            ${trendingMovies.results.slice(0, 6).map(movie => 
              this.card.renderMovie(movie)
            ).join('')}
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">Trending Series</h2>
          <div class="card-grid">
            ${trendingSeries.results.slice(0, 6).map(series => 
              this.card.renderSeries(series)
            ).join('')}
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">Trending People</h2>
          <div class="card-grid">
            ${trendingPeople.results.slice(0, 6).map(person => 
              this.card.renderPerson(person)
            ).join('')}
          </div>
        </section>
      `;
    } catch (error) {
      console.error('Error loading homepage:', error);
      return '<div class="error">Failed to load content. Please check your API key.</div>';
    }
  }

  attachEvents() {
    this.hero.attachEvents();
  }
}
