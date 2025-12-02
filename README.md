A Netflix style React movie app with login ,TMDB API integration,local authentication  and responsive design.

##  Project Structure
src/
├── api/                # TMDB API calls
├── assets/             # Images and fallback posters
├── components/         # Navbar, Footer, Loader, Modals
├── pages/
│    ├── Home/          # Home page UI and trending movies
│    ├── Movies/        # Infinite scroll movie listing
│    ├── Auth/          # Login and Signup pages
│    ├── MovieDetails/  # Overview, Cast, Reviews, Similar movies
├── utils/              # Local authentication helper functions
├── App.js              # Main routing file
└── index.js            # Application entry point

 
##  Project Features
 
- 🎥 **Trending Movies** — Browse latest trending films via TMDB  
- 🔍 **Movie Search** — Search movies with pagination  
- ♾️ **Infinite Scroll** — Auto-loading movies as you scroll  
- 🎞️ **Movie Details Page**  
  - Overview  
  - Cast  
  - Reviews  
  - Similar Movies  
- 🔐 **Authentication (Local)**  
  - Login (email/username)  
  - Signup  
  - Error handling  
- 🔏 **Protected Routes** — `/movies`, `/watch/:id`, `/search` accessible only after login  
- 🖼️ **Fallback Images** for missing posters  
- 📱 **Fully Responsive UI**  
- ⚡ **Clean File Structure & Modular Components**  
 
## 🔧 Environment Variables 
 
Create a `.env` file in the project root:

REACT_APP_TMDB_API_KEY=your_api_key_here
(Use your actual TMDB key locally --do not commit it)

##  Clone the Repository
git clone https://github.com/tanujagandi/themoviedatabase.git
cd themoviedatabase

##  Install Dependencies 
npm install

##  Build the Project
npm run build
This will create a **production-ready build** inside the `/build` folder.
 
##  Run Development Server
npm start
Runs at : http://localhost:3000

##  Run Tests
npm test
Runs unit tests and shows coverage.

##  summary
This project demonstrates:
 
- React fundamentals  
- API integration  
- Routing & navigation  
- Authentication  
- Component structuring  
- Deployment-ready build
 