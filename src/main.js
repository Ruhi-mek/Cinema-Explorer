import './style.css';
import { Router } from './router.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  const navbar = new Navbar();
  const footer = new Footer();
  
  app.innerHTML = `
    ${navbar.render()}
    <main id="content"></main>
    ${footer.render()}
  `;
  
  const router = new Router();
  router.init();
});
