// Movies Page 
import movieService from '../api/movieService.js';
import genreService from '../api/genreService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Sidebar } from '../components/Sidebar.js';
import { Pagination } from '../components/Pagination.js';

export class MoviesPage {
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
          <h2 class="section-title">Trending Movies</h2>
          <div class="card-grid" id="trending-movies"></div>
        </section>

        <section class="content-with-sidebar">
          <aside class="sidebar" id="sidebar-container"></aside>
          <div class="main-content">
            <h2 class="section-title" id="movies-title">All Movies</h2>
            <div id="movies-grid" class="card-grid"></div>
            <div class="pagination" id="pagination-container"></div>
          </div>
        </section>
      `;

      const [nowPlaying, trendingMovies, genresData] = await Promise.all([
        movieService.getNowPlaying(),
        movieService.getPopular(this.currentPage),
        genreService.getMovieGenres()
      ]);

      this.genres = genresData.genres;

      this.hero = new Hero('hero-section');
      this.hero.render(nowPlaying.results, 'movie');
      
      this.card.renderMovies(trendingMovies.results.slice(0, 6), 'trending-movies');
      
      this.sidebar = new Sidebar('sidebar-container');
      this.sidebar.render(this.genres, this.selectedGenreId);
      this.sidebar.attachEvents((genreId) => this.onGenreSelect(genreId));
      
      this.pagination = new Pagination('pagination-container');
      
      await this.loadMovies();
      
    } catch (error) {
      console.error('Error loading movies page:', error);
      content.innerHTML = '<div class="error">Failed to load movies. Please check your API key.</div>';
    }
  }

  async loadMovies() {
    try {
      const data = this.selectedGenreId
        ? await movieService.getByGenre(this.selectedGenreId, this.currentPage)
        : await movieService.getPopular(this.currentPage);

      this.card.renderMovies(data.results, 'movies-grid');
      
      const title = document.getElementById('movies-title');
      title.textContent = this.selectedGenreId ? 'Genre Movies' : 'All Movies';
      
      this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
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
  }
}
