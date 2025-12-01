import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import MovieCard from "../Movies/MovieCard";
import styles from "./SearchResults.module.css";
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 
export default function SearchResults() {
  const q = useQuery();
  const query = q.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (!query) return;
 
    setLoading(true);
 
    searchMovies(query)
      .then((data) => setResults(data.results || []))
      .finally(() => setLoading(false));
  }, [query]);
 
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search results for “{query}”</h2>
 
      {loading && <p>Searching...</p>}
 
      <div className={styles.grid}>
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
 
      {!loading && results.length === 0 && (
        <p style={{ color: "white" }}>No movies found.</p>
      )}
    </div>
  );
}
 
 