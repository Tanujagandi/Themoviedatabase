import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary";
 
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import VideoPlayerPage from "./pages/Movies/VideoPlayerPage"; // if exists
import TrendingMoviesTest from "./components/TrendingMoviesTest";
import Auth from "./pages/Auth/Auth";
import SearchResults from "./pages/Search/SearchResults";
import PrivateRoute from "./components/PrivateRoute";
 
function App() {
  return (
    <Router>
      <Navbar />
 
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
 
           
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
 
           
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
            <Route path="/watch/:id" element={<VideoPlayerPage />} />
            <Route path="/test" element={<TrendingMoviesTest />} />
            <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}
 
export default App;

