// Celebrities Page - Single Responsibility: Celebrities page logic and rendering
import peopleService from '../api/peopleService.js';
import { Hero } from '../components/Hero.js';
import { Card } from '../components/Card.js';
import { Pagination } from '../components/Pagination.js';

export class CelebritiesPage {
  constructor() {
    this.hero = new Hero();
    this.card = new Card();
    this.pagination = new Pagination();
    this.currentPage = 1;
  }

  async render() {
    try {
      const [trending, popular] = await Promise.all([
        peopleService.getTrending(),
        peopleService.getPopular(this.currentPage)
      ]);

      return `
        <section class="hero hero-people">
          <h1 class="hero-title-large">Trending Celebrities</h1>
          <div class="card-grid card-grid-large">
            ${trending.results.slice(0, 5).map(person => 
              this.card.renderPerson(person)
            ).join('')}
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">All Celebrities</h2>
          <div id="celebrities-grid" class="card-grid"></div>
          <div id="pagination-container"></div>
        </section>
      `;
    } catch (error) {
      console.error('Error loading celebrities page:', error);
      return '<div class="error">Failed to load celebrities. Please check your API key.</div>';
    }
  }

  async loadCelebrities() {
    try {
      const data = await peopleService.getPopular(this.currentPage);

      const celebritiesGrid = document.getElementById('celebrities-grid');
      celebritiesGrid.innerHTML = data.results.map(person => 
        this.card.renderPerson(person)
      ).join('');

      const paginationContainer = document.getElementById('pagination-container');
      paginationContainer.innerHTML = this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
      this.pagination.attachEvents((page) => this.onPageChange(page));
    } catch (error) {
      console.error('Error loading celebrities:', error);
    }
  }

  onPageChange(page) {
    this.currentPage = page;
    this.loadCelebrities();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  attachEvents() {
    this.loadCelebrities();
  }
}
