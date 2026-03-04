// Movies Page - Single Responsibility: Movies page logic and rendering
import movieService from '../api/movieService.js';
import genreService from '../api/genreService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Sidebar } from '../components/Sidebar.js';
import { Pagination } from '../components/Pagination.js';

export class MoviesPage {
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
      const [nowPlaying, trendingMovies, genresData] = await Promise.all([
        movieService.getNowPlaying(),
        movieService.getPopular(this.currentPage),
        genreService.getMovieGenres()
      ]);

      this.genres = genresData.genres;

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

        <section class="content-with-sidebar">
          <div id="sidebar-container">
            ${this.sidebar.render(this.genres, this.selectedGenreId)}
          </div>
          <div class="main-content">
            <h2 class="section-title">
              ${this.selectedGenreId ? 'Genre Movies' : 'All Movies'}
            </h2>
            <div id="movies-grid" class="card-grid"></div>
            <div id="pagination-container"></div>
          </div>
        </section>
      `;
    } catch (error) {
      console.error('Error loading movies page:', error);
      return '<div class="error">Failed to load movies. Please check your API key.</div>';
    }
  }

  async loadMovies() {
    try {
      const data = this.selectedGenreId
        ? await movieService.getByGenre(this.selectedGenreId, this.currentPage)
        : await movieService.getPopular(this.currentPage);

      const moviesGrid = document.getElementById('movies-grid');
      moviesGrid.innerHTML = data.results.map(movie => 
        this.card.renderMovie(movie)
      ).join('');

      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
      this.pagination.attachEvents((page) => this.onPageChange(page));
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }

  onPageChange(page) {
    this.currentPage = page;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onGenreSelect(genreId) {
    this.selectedGenreId = genreId;
    this.currentPage = 1;
    this.loadMovies();
  }

  attachEvents() {
    this.hero.attachEvents();
    this.sidebar.attachEvents((genreId) => this.onGenreSelect(genreId));
    this.loadMovies();
  }
}
