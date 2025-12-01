import React, { useEffect, useState } from "react";
import { fetchTrending } from "../api/tmdb";
 
function TrendingMoviesTest() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchTrending()
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError(err.message || "Failed"))
      .finally(() => setLoading(false));
  }, []);
 
  if (loading) return <p>Loading trending movies...</p>;
  if (error) return <p>Error: {error}</p>;
 
  return (
    <div style={{ padding: 20 }}>
      <h2>Trending Movies (test)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ background: "#222", padding: 10, borderRadius: 8, color: "#fff" }}>
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"} alt={movie.title} style={{ width: "100%", borderRadius: 8 }} />
            <h4 style={{ margin: "8px 0 0" }}>{movie.title}</h4>
            <p style={{ margin: "4px 0 0" }}>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default TrendingMoviesTest;