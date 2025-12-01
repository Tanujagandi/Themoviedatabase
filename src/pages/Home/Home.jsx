
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import MovieCard from "../Movies/MovieCard";
import { fetchTrending } from "../../api/tmdb";
 
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrending(1);
        if (!mounted) return;
        setTrendingMovies(Array.isArray(data?.results) ? data.results : []);
      } catch (err) {
        console.error("fetchTrending error:", err);
        if (mounted) setError(err.message || "Failed to load trending movies");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);
 
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.title}>Unlimited Movies,One Place</h1>
          <p className={styles.subtitle}>Explore trending films,discover new favourites and dive into endless entertainment.</p>
          <Link to="/movies" className={styles.exploreBtn}>Explore Movies</Link>
        </div>
      </div>
 
      <div className={styles.trendingSection}>
        <h2 className={styles.sectionTitle}> Trending Movies</h2>
 
        {loading && <p style={{ color: "#ccc" }}>Loading...</p>}
        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
 
        <div className={styles.moviesGrid}>
          {trendingMovies.map((movie) => (
            // No onClick passed here -> MovieCard will navigate to /movie/:id by default
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
 