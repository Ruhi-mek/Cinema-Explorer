// Series Page - Single Responsibility: Series page logic and rendering
import seriesService from '../api/seriesService.js';
import genreService from '../api/genreService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Sidebar } from '../components/Sidebar.js';
import { Pagination } from '../components/Pagination.js';

export class SeriesPage {
  constructor() {
    this.hero = null;
    this.card = new Card();
    this.sidebar = null;
    this.pagination = null;
    this.currentPage = 1;
    this.selectedGenreId = null;
    this.genres = [];
  }

  async render() {
    const content = document.getElementById('content');
    
    try {
      content.innerHTML = `
        <section class="hero" id="hero-section"></section>
        
        <section class="content-section">
          <h2 class="section-title">Trending Series</h2>
          <div class="card-grid" id="trending-series"></div>
        </section>

        <section class="content-with-sidebar">
          <aside class="sidebar" id="sidebar-container"></aside>
          <div class="main-content">
            <h2 class="section-title" id="series-title">All Series</h2>
            <div id="series-grid" class="card-grid"></div>
            <div class="pagination" id="pagination-container"></div>
          </div>
        </section>
      `;

      const [onTheAir, trendingSeries, genresData] = await Promise.all([
        seriesService.getOnTheAir(),
        seriesService.getPopular(this.currentPage),
        genreService.getTVGenres()
      ]);

      this.genres = genresData.genres;

      this.hero = new Hero('hero-section');
      this.hero.render(onTheAir.results, 'tv');
      
      this.card.renderSeries(trendingSeries.results.slice(0, 6), 'trending-series');
      
      this.sidebar = new Sidebar('sidebar-container');
      this.sidebar.render(this.genres, this.selectedGenreId);
      this.sidebar.attachEvents((genreId) => this.onGenreSelect(genreId));
      
      this.pagination = new Pagination('pagination-container');
      
      await this.loadSeries();
      
    } catch (error) {
      console.error('Error loading series page:', error);
      content.innerHTML = '<div class="error">Failed to load series. Please check your API key.</div>';
    }
  }

  async loadSeries() {
    try {
      const data = this.selectedGenreId
        ? await seriesService.getByGenre(this.selectedGenreId, this.currentPage)
        : await seriesService.getPopular(this.currentPage);

      this.card.renderSeries(data.results, 'series-grid');
      
      const title = document.getElementById('series-title');
      title.textContent = this.selectedGenreId ? 'Genre Series' : 'All Series';
      
      this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
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
    // Events are attached in components
  }
}
