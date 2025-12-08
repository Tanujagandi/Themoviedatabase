# React Movie Database Application
 
A Netflix-style React movie app with login, **TMDB API integration using Axios**, local authentication and responsive design.


##  Project Structure
 
src/
├── api/                # TMDB API calls (Axios + TMDB helpers)
├── assets/             # Images and fallback posters
├── components/         # Navbar, Footer, Loader, Modals, ErrorBoundary
├── context/            # (Optional) shared app state
├── hooks/              # Custom hooks (e.g., useFetch)
├── pages/
│   ├── Home/           # Home page UI and trending movies
│   ├── Movies/         # Infinite scroll movie listing
│   ├── Auth/           # Login and Signup pages (local auth)
│   ├── MovieDetails/   # Overview, Cast, Reviews, Similar movies
│   └── Search/         # Search results page
├── utils/              # Local authentication helper functions
├── App.js              # Main routing file (React Router)
└── index.js            # Application entry point

 
##  Project Features
 
-  **Trending Movies** — Browse latest trending films via TMDB  
-  **Movie Search** — Search movies with pagination  
-  **Infinite Scroll** — Auto-loading movies as you scroll  
-  **Movie Details Page**  
  - Overview  
  - Cast  
  - Reviews  
  - Similar Movies  
-  **Authentication (Local)**  
  - Login (email/username)  
  - Signup  
  - Error handling  
-  **Protected Routes** — `/movies`, `/watch/:id`, `/search` accessible only after login  
-  **Fallback Images** for missing posters  
-  **Fully Responsive UI**  
-  **Clean File Structure & Modular Components**  
 
##  Environment Variables 
 
Create a `.env` file in the project root:
REACT_APP_TMDB_API_KEY=your_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMG_BASE=https://image.tmdb.org/t/p/w500

##  Clone the Repository
git clone https://github.com/tanujagandi/themoviedatabase.git

cd themoviedatabase

## Install Dependencies
 
npm install
 
 
## Build the Project
 
npm run build  
 
This will create a **production-ready build** inside the `/build` folder.
 
 
## Run Development Server
 
npm start  
 
Runs at: http://localhost:3000
 
 
## Run Tests
 
npm test  
 
Runs unit tests and shows coverage.
 
 
## Summary
 
This project demonstrates:
 
- React fundamentals  
- API integration  
- Routing & navigation  
- Authentication  
- Component structuring  
- Deployment-ready build
 