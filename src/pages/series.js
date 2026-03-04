// Series Page - Single Responsibility: Series page logic and rendering
import seriesService from '../api/seriesService.js';
import genreService from '../api/genreService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Sidebar } from '../components/Sidebar.js';
import { Pagination } from '../components/Pagination.js';

export class SeriesPage {
  constructor() {
    this.hero = new Hero();
    this.card = new Card();
    this.sidebar = new Sidebar();
    this.pagination = new Pagination();
    this.currentPage = 1;
    this.selectedGenreId = null;
    this.genres = [];
  }

  async render() {
    try {
      const [onTheAir, trendingSeries, genresData] = await Promise.all([
        seriesService.getOnTheAir(),
        seriesService.getPopular(this.currentPage),
        genreService.getTVGenres()
      ]);

      this.genres = genresData.genres;

      return `
        ${this.hero.render(onTheAir.results, 'tv')}
        
        <section class="content-section">
          <h2 class="section-title">Trending Series</h2>
          <div class="card-grid">
            ${trendingSeries.results.slice(0, 6).map(series => 
              this.card.renderSeries(series)
            ).join('')}
          </div>
        </section>

        <section class="content-with-sidebar">
          <div id="sidebar-container">
            ${this.sidebar.render(this.genres, this.selectedGenreId)}
          </div>
          <div class="main-content">
            <h2 class="section-title">
              ${this.selectedGenreId ? 'Genre Series' : 'All Series'}
            </h2>
            <div id="series-grid" class="card-grid"></div>
            <div id="pagination-container"></div>
          </div>
        </section>
      `;
    } catch (error) {
      console.error('Error loading series page:', error);
      return '<div class="error">Failed to load series. Please check your API key.</div>';
    }
  }

  async loadSeries() {
    try {
      const data = this.selectedGenreId
        ? await seriesService.getByGenre(this.selectedGenreId, this.currentPage)
        : await seriesService.getPopular(this.currentPage);

      const seriesGrid = document.getElementById('series-grid');
      seriesGrid.innerHTML = data.results.map(series => 
        this.card.renderSeries(series)
      ).join('');

      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
      this.pagination.attachEvents((page) => this.onPageChange(page));
    } catch (error) {
      console.error('Error loading series:', error);
    }
  }

  onPageChange(page) {
    this.currentPage = page;
    this.loadSeries();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGenreSelect(genreId) {
    this.selectedGenreId = genreId;
    this.currentPage = 1;
    this.loadSeries();
  }

  attachEvents() {
    this.hero.attachEvents();
    this.sidebar.attachEvents((genreId) => this.onGenreSelect(genreId));
    this.loadSeries();
  }
}
