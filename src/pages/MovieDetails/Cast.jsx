
 
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import * as tmdb from "../../api/tmdb"; // expects fetchMovieCredits or fetchMovieCast
import styles from "./MovieDetails.module.css";
import fallbackPoster from "../../assets/fallback2.jpg"; // <-- use fallback2 here
 
const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w185";
 
export default function Cast() {
  const outlet = useOutletContext() || {};
  const contextMovie = outlet.movie || null;
  const { id: paramId } = useParams();
 
  const [cast, setCast] = useState(Array.isArray(outlet.cast) ? outlet.cast : []);
  const [loading, setLoading] = useState(!Array.isArray(outlet.cast) || outlet.cast.length === 0);
  const [error, setError] = useState("");
 
  const DESIRED_VISIBLE = 8;
 
  useEffect(() => {
    let mounted = true;
 
    async function load() {
      if (Array.isArray(outlet.cast) && outlet.cast.length > 0) {
        setCast(outlet.cast);
        setLoading(false);
        return;
      }
 
      const movieId = (contextMovie && contextMovie.id) || paramId;
      if (!movieId) {
        setError("Missing movie id for cast fetch.");
        setLoading(false);
        return;
      }
 
      setLoading(true);
      setError("");
 
      const fetchFn = tmdb.fetchMovieCredits ?? tmdb.fetchMovieCast ?? tmdb.fetchMovieCredits;
      if (typeof fetchFn !== "function") {
        setError("No cast fetch function found in API helper (add fetchMovieCredits or fetchMovieCast).");
        setLoading(false);
        return;
      }
 
      try {
        const res = await fetchFn(movieId);
        if (!mounted) return;
        const list = Array.isArray(res?.cast) ? res.cast : Array.isArray(res) ? res : [];
        setCast(list);
      } catch (err) {
        console.error("Cast fetch error:", err);
        if (mounted) setError(err.message || "Failed to load cast.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
 
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outlet.cast, contextMovie, paramId]);
 
  useEffect(() => {
    if (cast && cast.length > 0) {
      console.debug("Cast fetched:", cast.length, "sample:", cast.slice(0, 6).map(c => ({ id: c.id, name: c.name, profile_path: c.profile_path })));
    }
  }, [cast]);
 
  if (loading) return <p className={styles.loading}>Loading cast…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!Array.isArray(cast) || cast.length === 0) return <p className={styles.noData}>No cast information available.</p>;
 
  const sorted = [...cast].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const takeLimit = 16;
  const candidates = sorted.slice(0, takeLimit);
 
  // Pick cast with images first
  const withImages = candidates.filter((c) => c && c.profile_path);
  let displayed = withImages.slice(0, DESIRED_VISIBLE);
  const namesOnlyFallback = displayed.length === 0;
 
  return (
    <section className={styles.castSection}>
      <h3 className={styles.sectionHeading}>Main Cast</h3>
 
      {namesOnlyFallback ? (
        <div className={styles.namesOnly}>
          <p className={styles.noData}>No cast images available. Showing names only:</p>
          <div className={styles.castGridNames}>
            {sorted.slice(0, DESIRED_VISIBLE).map((m) => (
              <div key={m.credit_id || m.cast_id || m.id} className={styles.castNameOnly}>
                <strong>{m.name}</strong>
                <div className={styles.characterName}>{m.character}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.castGrid}>
          {displayed.map((m) => {
            const key = m.credit_id || m.cast_id || m.id;
            const imgSrc = m.profile_path ? `${TMDB_IMG_BASE}${m.profile_path}` : fallbackPoster;
 
            return (
              <div className={styles.castCard} key={key}>
                <div className={styles.posterBox}>
                  <img
                    className={styles.similarImg}
                    src={imgSrc}
                    alt={m.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = fallbackPoster; }}
                  />
                </div>
 
                <div className={styles.castText}>
                  <div className={styles.actorName}>{m.name}</div>
                  <div className={styles.characterName}>{m.character}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
 