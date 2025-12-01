// src/api/tmdb.js
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
 
// Build URL with key + parameters
function buildUrl(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
 
  if (API_KEY) {
    url.searchParams.set("api_key", API_KEY);
  }
 
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
 
  return url.toString();
}
 
// --- Trending Movies ---
export async function fetchTrending(page = 1, language = "en-US") {
  const url = buildUrl("/trending/movie/day", { page, language });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
}
 
// --- Search Movies ---
export async function searchMovies(query, page = 1) {
  const url = buildUrl("/search/movie", { query, page, language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
}
 
// --- Movie Details ---
export async function fetchMovieDetails(id) {
  const url = buildUrl(`/movie/${id}`, { language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
 
// --- Movie Cast ---
export async function fetchMovieCast(id) {
  const url = buildUrl(`/movie/${id}/credits`);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie cast");
  return res.json();
}
 
// --- Movie Reviews ---
export async function fetchMovieReviews(id, page = 1) {
  const url = buildUrl(`/movie/${id}/reviews`, { page });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie reviews");
  return res.json();
}
 
// --- Similar Movies ---
export async function fetchSimilarMovies(id) {
  const url = buildUrl(`/movie/${id}/similar`, { language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
}
 
// --- TMDB Trailer Videos (/videos endpoint) ---
export async function fetchMovieVideos(id) {
  const url = buildUrl(`/movie/${id}/videos`, { language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie videos");
  return res.json();
}

export async function fetchMovieCredits(movieId) {
  const url = buildUrl(`/movie/${movieId}/credits`, { language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB credits fetch failed (${res.status})`);
  return res.json();
}

export default {
  fetchTrending,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchMovieVideos,
};
 