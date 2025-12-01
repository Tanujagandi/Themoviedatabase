import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import styles from "./VideoPlayerPage.module.css";
 
/**
* VideoPlayerPage - fetches trailer info from TMDB and shows a YouTube player.
* Uses REACT_APP_TMDB_API_KEY from .env
*/
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
 
async function fetchTrailerKey(movieId) {
  if (!API_KEY) {
    throw new Error("Missing API key. Set REACT_APP_TMDB_API_KEY in .env");
  }
  const url = `${BASE}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB videos fetch failed (${res.status})`);
  const data = await res.json();
  // prefer official YouTube trailer, fallback to any YouTube video
  const videos = Array.isArray(data.results) ? data.results : [];
  const trailer =
    videos.find((v) => v.site === "YouTube" && /trailer/i.test(v.type)) ||
    videos.find((v) => v.site === "YouTube" && /teaser/i.test(v.type)) ||
    videos.find((v) => v.site === "YouTube");
  return trailer ? trailer.key : null;
}
 
export default function VideoPlayerPage() {
  const { id } = useParams(); // url param /watch/:id
  const navigate = useNavigate();
 
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const loadTrailer = useCallback(async () => {
    setLoading(true);
    setError("");
    setTrailerKey(null);
    try {
      const key = await fetchTrailerKey(id);
      if (!key) {
        setError("Trailer not available for this movie.");
      } else {
        setTrailerKey(key);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load trailer.");
    } finally {
      setLoading(false);
    }
  }, [id]);
 
  useEffect(() => {
    loadTrailer();
  }, [loadTrailer]);
 
  // YouTube player options
  const ytOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,     // we'll mute on ready to allow autoplay
      controls: 1,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
    },
  };
 
  function onPlayerReady(event) {
    // Mute first to allow autoplay on many browsers, then play
    try {
      event.target.mute();
      event.target.playVideo();
    } catch (e) {
      // ignore
    }
  }
 
  function onPlayerError(e) {
    console.warn("YouTube player error", e);
    setError("Video player error.");
  }
 
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>🎬 Watching Movie ID: {id}</h2>
 
      {loading && <p className={styles.message}>Loading trailer…</p>}
      {error && <p className={styles.messageError}>{error}</p>}
 
      {!loading && trailerKey && (
        <div className={styles.playerContainer}>
          <div className={styles.playerWrapper}>
            <YouTube
              videoId={trailerKey}
              opts={ytOpts}
              onReady={onPlayerReady}
              onError={onPlayerError}
            />
          </div>
        </div>
      )}
 
      <div className={styles.controls}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Movies
        </button>
        <button
          className={styles.reloadBtn}
          onClick={() => {
            setError("");
            setTrailerKey(null);
            loadTrailer();
          }}
        >
          Reload Trailer
        </button>
      </div>
    </div>
  );
}