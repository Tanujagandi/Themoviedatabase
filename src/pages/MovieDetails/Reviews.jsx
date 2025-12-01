
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb";
import styles from "./MovieDetails.module.css";
 
export default function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMovieReviews(id, 1);
        if (!mounted) return;
        setReviews(Array.isArray(data?.results) ? data.results : []);
      } catch (err) {
        console.error("fetchMovieReviews error:", err);
        if (mounted) setError(err.message || "Failed to load reviews.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);
 
  if (loading) {
    return <p className={styles.loading}>Loading reviews…</p>;
  }
 
  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }
 
  if (!reviews.length) {
    return <p className={styles.noData}>No reviews available for this movie.</p>;
  }
 
  return (
    <div className={styles.reviews}>
      {reviews.map((r) => (
        <article key={r.id} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <strong>{r.author || "Anonymous"}</strong>
            <span className={styles.reviewDate}>
              {r.created_at ? new Date(r.created_at).toLocaleDateString() : ""}
            </span>
          </div>
 
          <div className={styles.reviewContent}>
            {r.content ? (
              <p>{r.content}</p>
            ) : (
              <p className={styles.noData}>No review content available.</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
 