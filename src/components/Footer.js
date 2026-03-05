// Footer Component - Single Responsibility: Footer UI
export class Footer {
  render() {
    return `
      <footer class="footer">
        <p>&copy; ${new Date().getFullYear()} Cinema Explorer.</p>
      </footer>
    `;
  }
}

