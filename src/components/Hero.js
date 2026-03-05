// Hero Component
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export class Hero {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(items, type = 'movie') {
    const heroItems = items.slice(0, 5);
    
    this.container.innerHTML = `
      <div class="hero-carousel">
        ${heroItems.map((item, index) => `
          <div class="hero-slide ${index === 0 ? 'active' : ''}" 
               style="background-image: url('${IMAGE_BASE_URL}${item.backdrop_path}')">
            <div class="hero-content">
              <h1 class="hero-title">${item.title || item.name}</h1>
              <p class="hero-overview">${item.overview || ''}</p>
              <div class="hero-meta">
                <span class="hero-rating">⭐ ${item.vote_average?.toFixed(1)}</span>
                <span class="hero-date">${item.release_date || item.first_air_date || ''}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="hero-controls">
        ${heroItems.map((_, index) => `
          <button class="hero-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
        `).join('')}
      </div>
    `;
    
    this.attachEvents();
  }

  attachEvents() {
    const dots = this.container.querySelectorAll('.hero-dot');
    const slides = this.container.querySelectorAll('.hero-slide');
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dot.classList.add('active');
      });
    });
  }
}
