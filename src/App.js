import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";   
 
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import VideoPlayerPage from "./pages/Movies/VideoPlayerPage";
import TrendingMoviesTest from "./components/TrendingMoviesTest";
import Auth from "./pages/Auth/Auth";
import SearchResults from "./pages/Search/SearchResults";
import PrivateRoute from "./components/PrivateRoute";
 
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Overview from "./pages/MovieDetails/Overview";
import Cast from "./pages/MovieDetails/Cast";
import Reviews from "./pages/MovieDetails/Reviews";
 
function App() {
  return (
    <Router>
      <Navbar />
 
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
 
            {/* MOVIE DETAILS */}
            <Route path="/movie/:id" element={<MovieDetails />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
 
            {/* PROTECTED */}
            <Route
              path="/movies"
              element={
                <PrivateRoute>
                  <Movies />
                </PrivateRoute>
              }
            />
 
            <Route
              path="/watch/:id"
              element={
                <PrivateRoute>
                  <VideoPlayerPage />
                </PrivateRoute>
              }
            />
 
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchResults />
                </PrivateRoute>
              }
            />
 
            <Route path="/test" element={<TrendingMoviesTest />} />
 
            {/* 404 */}
            <Route
              path="*"
              element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
 
      <Footer />  
    </Router>
  );
}
 
export default App;
 