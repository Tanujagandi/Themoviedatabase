
 
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails, fetchSimilarMovies } from "../../api/tmdb";
import styles from "./MovieDetails.module.css";
import fallbackPoster from "../../assets/fallback2.jpg"; // <-- use fallback2 here
 
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  // keep toggle if you want to hide missing posters; currently false so we include all and show fallback
  const HIDE_MISSING_POSTERS = false;
 
  useEffect(() => {
    let active = true;
 
    async function loadMovie() {
      setLoading(true);
      setError("");
      setMovie(null);
      setSimilar([]);
 
      try {
        const details = await fetchMovieDetails(id);
        if (active) setMovie(details);
 
        const sim = await fetchSimilarMovies(id);
        if (active) setSimilar(sim?.results || []);
      } catch (err) {
        console.error("MovieDetails load error:", err);
        if (active) setError("Failed to load movie details.");
      } finally {
        if (active) setLoading(false);
      }
    }
 
    loadMovie();
    return () => { active = false; };
  }, [id]);
 
  if (loading) return <p className={styles.loading}>Loading movie details…</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.error}>Movie not found.</p>;
 
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallbackPoster;
 
  // prepare similar list according to toggle (we keep all but show fallback image if missing)
  const similarFiltered = HIDE_MISSING_POSTERS
    ? (similar || []).filter((m) => m && m.poster_path)
    : similar || [];
 
  const TMDB_SIMILAR_BASE = "https://image.tmdb.org/t/p/w300";
 
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <img
          className={styles.poster}
          src={posterUrl}
          alt={movie.title || "Poster"}
          onError={(e) => (e.currentTarget.src = fallbackPoster)}
        />
 
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
 
          <p className={styles.meta}>
            {movie.release_date && `Release: ${movie.release_date}`}{" "}
            {movie.runtime && `• ${movie.runtime} mins`}
          </p>
 
          {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
 
          <div className={styles.actions}>
            <Link to={`/watch/${movie.id}`} className={styles.watchBtn}>
              ▶ Watch Trailer
            </Link>
          </div>
        </div>
      </div>
 
      {/* TABS */}
      <nav className={styles.tabs}>
        <NavLink to="overview" className={({ isActive }) => (isActive ? styles.tabActive : styles.tab)}>
          Overview
        </NavLink>
 
        <NavLink to="cast" className={({ isActive }) => (isActive ? styles.tabActive : styles.tab)}>
          Cast
        </NavLink>
 
        <NavLink to="reviews" className={({ isActive }) => (isActive ? styles.tabActive : styles.tab)}>
          Reviews
        </NavLink>
      </nav>
 
      {/* NESTED ROUTE OUTLET */}
      <div className={styles.outlet}>
        <Outlet context={{ movie }} />
      </div>
 
      {/* SIMILAR MOVIES */}
      {similarFiltered.length > 0 && (
        <div className={styles.similarSection}>
          <h3 className={styles.similarTitle}>Similar Movies</h3>
 
          <div className={styles.similarGrid}>
            {similarFiltered.map((m) => {
              const imgUrl = m && m.poster_path
                ? `${TMDB_SIMILAR_BASE}${m.poster_path}`
                : fallbackPoster;
 
              return (
                <Link key={m.id} to={`/movie/${m.id}`} className={styles.similarCard}>
                  <img
                    src={imgUrl}
                    alt={m.title}
                    onError={(e) => (e.currentTarget.src = fallbackPoster)}
                    className={styles.similarImg}
                  />
                  <p className={styles.similarTitleText}>{m.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}