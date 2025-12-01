import React from "react";
import styles from "./Footer.module.css";
 
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
 
        <h2 className={styles.brand}>ReelFlix</h2>
 
        <p className={styles.tagline}>
          Unlimited Movies, One Place.
        </p>
 
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/search">Search</a>
          <a href="/login">Login</a>
        </div>
 
        <p className={styles.copy}>
          © {new Date().getFullYear()} ReelFlix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}