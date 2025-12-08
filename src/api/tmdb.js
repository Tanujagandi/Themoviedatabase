// src/api/tmdb.js
import axios from "axios";
 
// Read values from .env (with safe fallbacks)
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";
 
// Image base URL (can also be set from .env)
export const TMDB_IMG_BASE =
  process.env.REACT_APP_TMDB_IMG_BASE || "https://image.tmdb.org/t/p/w500";
 
// Build URL with key + parameters
function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
 
  if (API_KEY) {
    url.searchParams.set("api_key", API_KEY);
  }
 
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, v);
    }
  });
 
  return url.toString();
}
 
// Helper to normalize axios errors into a nice message
function axiosErrorMessage(err, defaultMsg) {
  if (err.response) {
    // Server responded with a status outside 2xx
    return `${defaultMsg} (status ${err.response.status})`;
  }
  if (err.request) {
    // Request made but no response
    return `${defaultMsg} (no response from server)`;
  }
  // Something else happened
  return `${defaultMsg} (${err.message})`;
}
 
// --- Trending Movies ---
export async function fetchTrending(page = 1, language = "en-US") {
  const url = buildUrl("/trending/movie/day", { page, language });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch trending movies"));
  }
}
 
// --- Search Movies ---
export async function searchMovies(query, page = 1) {
  const url = buildUrl("/search/movie", { query, page, language: "en-US" });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to search movies"));
  }
}
 
// --- Movie Details ---
export async function fetchMovieDetails(id) {
  const url = buildUrl(`/movie/${id}`, { language: "en-US" });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch movie details"));
  }
}
 
// --- Movie Cast ---
export async function fetchMovieCast(id) {
  const url = buildUrl(`/movie/${id}/credits`);
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch movie cast"));
  }
}
 
// --- Movie Credits (full credits) ---
export async function fetchMovieCredits(movieId) {
  const url = buildUrl(`/movie/${movieId}/credits`, { language: "en-US" });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch movie credits"));
  }
}
 
// --- Movie Reviews ---
export async function fetchMovieReviews(id, page = 1) {
  const url = buildUrl(`/movie/${id}/reviews`, { page });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch movie reviews"));
  }
}
 
// --- Similar Movies ---
export async function fetchSimilarMovies(id) {
  const url = buildUrl(`/movie/${id}/similar`, { language: "en-US" });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch similar movies"));
  }
}
 
// --- Trailer Videos ---
export async function fetchMovieVideos(id) {
  const url = buildUrl(`/movie/${id}/videos`, { language: "en-US" });
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(axiosErrorMessage(err, "Failed to fetch movie videos"));
  }
}
 
const tmdbApi = {
  fetchTrending,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchMovieVideos,
};
 
export default tmdbApi;
 
 