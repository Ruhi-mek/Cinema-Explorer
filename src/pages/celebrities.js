// Celebrities Page - Single Responsibility: Celebrities page logic and rendering
import peopleService from '../api/peopleService.js';
import { Card } from '../components/Card.js';
import { Pagination } from '../components/Pagination.js';

export class CelebritiesPage {
  constructor() {
    this.card = new Card();
    this.pagination = null;
    this.currentPage = 1;
  }

  async render() {
    const content = document.getElementById('content');
    
    try {
      content.innerHTML = `
        <section class="hero hero-people">
          <h1 class="hero-title-large">Trending Celebrities</h1>
          <div class="card-grid card-grid-large" id="trending-celebrities"></div>
        </section>

        <section class="content-section">
          <h2 class="section-title">All Celebrities</h2>
          <div id="celebrities-grid" class="card-grid"></div>
          <div class="pagination" id="pagination-container"></div>
        </section>
      `;

      const [trending, popular] = await Promise.all([
        peopleService.getTrending(),
        peopleService.getPopular(this.currentPage)
      ]);

      this.card.renderPeople(trending.results.slice(0, 5), 'trending-celebrities');
      
      this.pagination = new Pagination('pagination-container');
      
      await this.loadCelebrities();
      
    } catch (error) {
      console.error('Error loading celebrities page:', error);
      content.innerHTML = '<div class="error">Failed to load celebrities. Please check your API key.</div>';
    }
  }

  async loadCelebrities() {
    try {
      const data = await peopleService.getPopular(this.currentPage);

      this.card.renderPeople(data.results, 'celebrities-grid');
      
      this.pagination.render(
        this.currentPage,
        Math.min(data.total_pages, 500),
        (page) => this.onPageChange(page)
      );
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
    // Events are attached in components
  }
}
