import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
import styles from "./Movies.module.css";
 
import MovieCard from "./MovieCard"; // file: src/pages/Movies/MovieCard.jsx
import { fetchTrending } from "../../api/tmdb"; // your API helper
import * as auth from "../../utils/auth"; // existing auth utils (getUser, logout, etc.)
 
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
 
    fetchTrending()
      .then((data) => {
        if (!mounted) return;
        // TMDB returns { results: [...] }
        setMovies(Array.isArray(data?.results) ? data.results : []);
      })
      .catch((err) => {
        console.error("fetchTrending error:", err);
        if (!mounted) return;
        setError(err.message || "Failed to load movies.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
 
    return () => {
      mounted = false;
    };
  }, []);
 
  // click a movie card: if logged in -> go to watch route, else -> go to login
  const handleCardClick = (movie) => {
    const user = auth && typeof auth.getUser === "function" ? auth.getUser() : null;
    if (user) {
      navigate(`/watch/${movie.id}`);
    } else {
      // redirect to login if not signed in
      navigate(`/login`);
    }
  };
 
  return (
    <div className={styles.page}>
      <h2 className={styles.sectionTitle}> Trending Movies</h2>
 
      {loading && <p style={{ textAlign: "center", color: "#fff" }}>Loading movies…</p>}
 
      {error && (
        <div style={{ maxWidth: 900, margin: "20px auto", padding: 12, background: "#2b1e1e", color: "#ffdede", borderRadius: 8 }}>
          <strong>Oops:</strong> {error}
        </div>
      )}
 
      {!loading && !error && (
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => handleCardClick(movie)} />
          ))}
        </div>
      )}
 
      {!loading && !error && movies.length === 0 && (
        <p style={{ textAlign: "center", color: "#ccc", marginTop: 24 }}>No trending movies found.</p>
      )}
    </div>
  );
}