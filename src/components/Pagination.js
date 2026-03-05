// Pagination Component - Single Responsibility: Pagination UI and logic
export class Pagination {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(currentPage, totalPages, onPageChange) {
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    this.container.innerHTML = `
      <button class="pagination-btn" 
              data-page="${currentPage - 1}" 
              ${currentPage === 1 ? 'disabled' : ''}>
        Previous
      </button>
      
      ${startPage > 1 ? `
        <button class="pagination-btn" data-page="1">1</button>
        ${startPage > 2 ? '<span class="pagination-ellipsis">...</span>' : ''}
      ` : ''}
      
      ${pages.map(page => `
        <button class="pagination-btn ${page === currentPage ? 'active' : ''}" 
                data-page="${page}">
          ${page}
        </button>
      `).join('')}
      
      ${endPage < totalPages ? `
        ${endPage < totalPages - 1 ? '<span class="pagination-ellipsis">...</span>' : ''}
        <button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>
      ` : ''}
      
      <button class="pagination-btn" 
              data-page="${currentPage + 1}" 
              ${currentPage === totalPages ? 'disabled' : ''}>
        Next
      </button>
    `;
    
    this.attachEvents(onPageChange);
  }

  attachEvents(onPageChange) {
    const buttons = this.container.querySelectorAll('.pagination-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (!isNaN(page) && !btn.disabled) {
          onPageChange(page);
        }
      });
    });
  }
}
