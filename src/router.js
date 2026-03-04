// Router - Single Responsibility: Handle navigation and routing
import { HomePage } from './pages/home.js';
import { MoviesPage } from './pages/movies.js';
import { SeriesPage } from './pages/series.js';
import { CelebritiesPage } from './pages/celebrities.js';

export class Router {
  constructor() {
    this.routes = {
      '/': HomePage,
      '/movies': MoviesPage,
      '/series': SeriesPage,
      '/celebrities': CelebritiesPage
    };
    this.currentPage = null;
  }

  async navigate(path) {
    const PageClass = this.routes[path] || this.routes['/'];
    this.currentPage = new PageClass();
    
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loader">Loading...</div>';
    
    const html = await this.currentPage.render();
    content.innerHTML = html;
    
    if (this.currentPage.attachEvents) {
      this.currentPage.attachEvents();
    }
  }

  init() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        window.history.pushState({}, '', path);
        this.navigate(path);
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname);
    });

    // Initial load
    this.navigate(window.location.pathname);
  }
}
