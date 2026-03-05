// Sidebar Component
export class Sidebar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(genres, selectedGenreId = null) {
    this.container.innerHTML = `
      <h2 class="sidebar-title">Genres</h2>
      <ul class="sidebar-list">
        ${genres.map(genre => `
          <li class="sidebar-item ${genre.id === selectedGenreId ? 'active' : ''}" 
              data-genre-id="${genre.id}">
            ${genre.name}
          </li>
        `).join('')}
      </ul>
    `;
  }

  attachEvents(onGenreSelect) {
    const items = this.container.querySelectorAll('.sidebar-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const genreId = parseInt(item.dataset.genreId);
        
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        onGenreSelect(genreId);
      });
    });
  }
}
