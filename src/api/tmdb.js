const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
 
/**
* Build a full URL for TMDB endpoints.
* If API_KEY is missing we still return a valid URL (caller should handle errors).
*/
function buildUrl(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  if (API_KEY) url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  return url.toString();
}
 
/**
* Fetch trending movies (daily)
*/
export async function fetchTrending(page = 1, language = "en-US") {
  const url = buildUrl("/trending/movie/day", { language, page });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB trending fetch failed (${res.status})`);
  return res.json();
}
 
/**
* Search movies by query
*/
export async function searchMovies(query, page = 1) {
  const url = buildUrl("/search/movie", { query, page, language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB search failed (${res.status})`);
  return res.json();
}
 
/**
* Fetch movie details (useful if you need runtime/genres/etc)
*/
export async function fetchMovieDetails(movieId, language = "en-US") {
  if (!movieId) throw new Error("fetchMovieDetails: movieId required");
  const url = buildUrl(`/movie/${movieId}`, { language });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB movie details fetch failed (${res.status})`);
  return res.json();
}
 
/**
* Fetch videos for a movie and return the best YouTube trailer key (or null)
*
* Returns: string | null  (YouTube video id, e.g. "XxYyZz123")
*/
export async function fetchTrailer(movieId) {
  if (!movieId) throw new Error("fetchTrailer: movieId required");
  const url = buildUrl(`/movie/${movieId}/videos`, { language: "en-US" });
  const res = await fetch(url);
  if (!res.ok) {
    // bubble up a clear error so caller can handle (e.g. show fallback)
    throw new Error(`TMDB trailer fetch failed (${res.status})`);
  }
  const data = await res.json();
  if (!data || !Array.isArray(data.results)) return null;
 
  // Prefer an official YouTube trailer; fallback to any YouTube video
  const officialTrailer = data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && (v.official === true || v.official === "True")
  );
  if (officialTrailer) return officialTrailer.key;
 
  const anyYoutube = data.results.find((v) => v.site === "YouTube");
  return anyYoutube ? anyYoutube.key : null;
}
 
export default {
  fetchTrending,
  searchMovies,
  fetchMovieDetails,
  fetchTrailer,
};