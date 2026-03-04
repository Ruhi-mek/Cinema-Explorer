// Sidebar Component - Single Responsibility: Genre sidebar UI
export class Sidebar {
  render(genres, selectedGenreId = null) {
    return `
      <aside class="sidebar">
        <h2 class="sidebar-title">Genres</h2>
        <ul class="sidebar-list">
          ${genres.map(genre => `
            <li class="sidebar-item ${genre.id === selectedGenreId ? 'active' : ''}" 
                data-genre-id="${genre.id}">
              ${genre.name}
            </li>
          `).join('')}
        </ul>
      </aside>
    `;
  }

  attachEvents(onGenreSelect) {
    const items = document.querySelectorAll('.sidebar-item');
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
