// Navbar Component 
export class Navbar {
  constructor() {
    this.navLinks = null;
  }

  render() {
    return `
      <nav class="navbar">
        <div class="navbar-left">
          <img src="/brand name.svg" alt="Cinema Explorer" class="brand-logo" />
        </div>
        <div class="navbar-right">
          <a href="/" class="nav-link" data-page="home">Home</a>
          <a href="/movies" class="nav-link" data-page="movies">Movies</a>
          <a href="/series" class="nav-link" data-page="series">Series</a>
          <a href="/celebrities" class="nav-link" data-page="celebrities">Celebrities</a>
        </div>
      </nav>
    `;
  }

  // Highlight active navigation link
  setActiveLink(path) {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }

  // Initialize navbar functionality
  init() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.setActiveLink(window.location.pathname);
  }
}