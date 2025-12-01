import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
 
import MovieCard from "../Movies/MovieCard"; // adjust path if your file lives elsewhere
import ConfirmWatchModel from "../../components/ConfirmWatchModel";
import * as auth from "../../utils/auth";
import { fetchTrending } from "../../api/tmdb"; // uses named export from your tmdb helper
 
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // modal state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
 
    fetchTrending(1)
      .then((data) => {
        if (!mounted) return;
        if (data && data.results) setTrendingMovies(data.results);
        else setTrendingMovies([]);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load trending movies");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
 
    return () => {
      mounted = false;
    };
  }, []);
 
  // click handler used by MovieCard
  const handleMovieClick = (movie) => {
    const user = auth && typeof auth.getUser === "function" ? auth.getUser() : null;
    if (!user) {
      // not logged in -> redirect to login
      navigate("/login");
      return;
    }
 
    // logged in -> open confirm modal
    setSelectedMovie(movie);
    setShowModal(true);
  };
 
  const handleConfirm = () => {
    setShowModal(false);
    if (selectedMovie && selectedMovie.id) {
      navigate(`/watch/${selectedMovie.id}`);
    }
  };
 
  const handleCloseModal = () => setShowModal(false);
 
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
 
        <div className={styles.content}>
          <h1 className={styles.title}>Welcome to ReelFlix</h1>
          <p className={styles.subtitle}>
            Explore trending films, discover new favorites and dive into endless entertainment.
          </p>
 
          <Link to="/movies" className={styles.exploreBtn}>
            Browse Movies
          </Link>
        </div>
      </div>
 
      <div className={styles.trendingSection}>
        <h2 className={styles.sectionTitle}>🔥 Trending Movies</h2>
 
        {loading && <p style={{ color: "#fff" }}>Loading...</p>}
        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
 
        <div className={styles.moviesGrid}>
          {trendingMovies && trendingMovies.length > 0 ? (
            trendingMovies.map((m) => (
              <MovieCard key={m.id} movie={m} onClick={handleMovieClick} />
            ))
          ) : (
            !loading && <p style={{ color: "#fff" }}>No movies found.</p>
          )}
        </div>
      </div>
 
      <ConfirmWatchModel
        open={showModal}
        movie={selectedMovie}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}