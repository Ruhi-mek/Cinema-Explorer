// Navbar Component - Single Responsibility: Navigation UI
export class Navbar {
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
}
