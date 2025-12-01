import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as auth from "../utils/auth";
import styles from "./Navbar.module.css";
 
export default function Navbar() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    if (auth && typeof auth.getUser === "function") setUser(auth.getUser());
    else setUser(null);
  }, [location]);
 
  const handleLogout = () => {
    if (auth && typeof auth.logout === "function") auth.logout();
    setUser(null);
    navigate("/");
  };
 
  const onSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQuery("");
  };
 
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          ReelFlix
        </Link>
      </h1>
 
      {/* Show search ONLY when user is logged in */}
      {user && (
        <form onSubmit={onSubmit} className={styles.searchForm} role="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      )}
 
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
 
        <li>
          <Link to="/movies">Movies</Link>
        </li>
 
        <li>
          {user ? (
            <>
              <span className={styles.user}>Hi, {user.username}</span>
              <button onClick={handleLogout} className={styles.btn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.btn}>
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
