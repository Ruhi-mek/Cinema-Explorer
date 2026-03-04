# Cinema Explorer 🎬

A modern, multi-page cinema discovery web application built with vanilla JavaScript, following SOLID principles and modular architecture.

## Features

- 🏠 Homepage with trending movies, series, and celebrities
- 🎬 Movies page with genre filtering and pagination
- 📺 Series page with genre filtering and pagination
- 🧑‍🎤 Celebrities page with pagination
- 🎨 Responsive design
- 🔄 Client-side routing (SPA)
- 🎯 SOLID principles implementation
- 🔐 Secure API key handling

## Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Vite (Build tool)
- TMDB API

## Project Structure

```
src/
├── api/
│   ├── apiClient.js       # Base API client with authentication
│   ├── movieService.js    # Movie-related API calls
│   ├── seriesService.js   # Series-related API calls
│   ├── peopleService.js   # Celebrity-related API calls
│   └── genreService.js    # Genre-related API calls
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Footer.js          # Footer component
│   ├── Hero.js            # Hero carousel component
│   ├── Card.js            # Content card component
│   ├── Pagination.js      # Pagination component
│   └── Sidebar.js         # Genre sidebar component
├── pages/
│   ├── home.js            # Homepage
│   ├── movies.js          # Movies page
│   ├── series.js          # Series page
│   └── celebrities.js     # Celebrities page
├── router.js              # Client-side router
├── main.js                # App entry point
└── style.css              # Global styles
```

## How to Get Your TMDB API Key

### Step 1: Create a TMDB Account
1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Click "Sign Up" in the top right corner
3. Fill in your details and create an account
4. Verify your email address

### Step 2: Request API Access
1. Log in to your TMDB account
2. Click on your profile icon in the top right
3. Select "Settings" from the dropdown menu
4. In the left sidebar, click on "API"
5. Click on "Request an API Key"
6. Choose "Developer" option
7. Accept the terms of use
8. Fill in the application form:
   - Application Name: "Cinema Explorer" (or your project name)
   - Application URL: "http://localhost:5173" (for development)
   - Application Summary: Brief description of your project

### Step 3: Get Your Bearer Token
1. After submitting, you'll be taken to your API settings page
2. You'll see two keys:
   - **API Key (v3 auth)** - This is NOT what you need
   - **API Read Access Token (v4 auth)** - This is your Bearer Token ✅
3. Copy the "API Read Access Token" (it's a long string starting with "eyJ...")

### Step 4: Add Token to Your Project
1. Open the `.env` file in the project root
2. Replace `your_tmdb_bearer_token_here` with your actual token:
   ```
   VITE_TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI...
   ```
3. Save the file

### Important Notes:
- ⚠️ Never commit your `.env` file to Git (it's already in `.gitignore`)
- ⚠️ Never share your API token publicly
- ⚠️ Use the "API Read Access Token", NOT the "API Key (v3 auth)"
- ⚠️ The token should be a long string (around 200+ characters)

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your TMDB Bearer Token (see above)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable in Vercel dashboard:
   - Key: `VITE_TMDB_API_KEY`
   - Value: Your TMDB Bearer Token

### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Add environment variable in Netlify dashboard:
   - Key: `VITE_TMDB_API_KEY`
   - Value: Your TMDB Bearer Token

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
- Each service handles only one type of API calls (movies, series, people, genres)
- Each component has one specific UI responsibility
- Each page manages only its own logic and rendering

### Open/Closed Principle (OCP)
- Components are extendable without modification
- Adding new pages doesn't require changing existing code
- New API endpoints can be added without breaking existing ones

### Liskov Substitution Principle (LSP)
- Card component can render movies, series, or people with the same interface
- All pages follow the same structure and can be swapped

### Interface Segregation Principle (ISP)
- Services expose only relevant methods
- Components don't depend on unused functionality

### Dependency Inversion Principle (DIP)
- Pages depend on service abstractions, not direct fetch calls
- Router depends on page interfaces, not implementations

## API Endpoints Used

- `/movie/now_playing` - Recent movies
- `/movie/popular` - Popular movies
- `/trending/movie/week` - Trending movies
- `/discover/movie` - Movies by genre
- `/tv/on_the_air` - Recent series
- `/tv/popular` - Popular series
- `/trending/tv/week` - Trending series
- `/discover/tv` - Series by genre
- `/person/popular` - Popular celebrities
- `/trending/person/week` - Trending celebrities
- `/genre/movie/list` - Movie genres
- `/genre/tv/list` - TV genres

## License

MIT
