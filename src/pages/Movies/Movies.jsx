
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import styles from "./Movies.module.css";
import ConfirmWatchModel from "../../components/ConfirmWatchModel";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { fetchTrending } from "../../api/tmdb";
 
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
 
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    let mounted = true;
 
    async function load() {
      setLoading(true);
      try {
        const data = await fetchTrending(page);
        if (!mounted) return;
 
        const results = Array.isArray(data?.results) ? data.results : [];
 
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
        setHasMore(page < (data?.total_pages || 1));
      } catch (err) {
        if (mounted) setError("Failed to fetch movies");
      } finally {
        if (mounted) setLoading(false);
      }
    }
 
    load();
    return () => {
      mounted = false;
    };
  }, [page]);
 
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
 
  const handleConfirm = () => {
    setShowModal(false);
    if (selectedMovie?.id) navigate(`/watch/${selectedMovie.id}`);
  };
 
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };
 
  if (loading && page === 1) return <Loader />;
  if (error) return <Error message={error} />;
 
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Trending Movies</h2>
 
        <InfiniteScroll
          dataLength={movies.length}
          next={() => setPage((p) => p + 1)}
          hasMore={hasMore}
          loader={<Loader />}
          style={{ overflow: "visible" }}
        >
          <div className={styles.moviesGrid}>
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} onClick={handleCardClick} />
            ))}
          </div>
        </InfiniteScroll>
 
        <ConfirmWatchModel
          open={showModal}
          movie={selectedMovie}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}