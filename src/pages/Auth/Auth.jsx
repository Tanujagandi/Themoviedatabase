import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { login, signup } from "../../utils/auth";
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
 
export default function Auth() {
  const q = useQuery();
  const modeParam = q.get("mode"); // optional: ?mode=signup
  const [mode, setMode] = useState(modeParam === "signup" ? "signup" : "login"); // "login" | "signup"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
 
  // If PrivateRoute redirected here it passes state.from
  const from = location.state?.from?.pathname || "/";
 
  // shared fields
  const [identity, setIdentity] = useState(""); // username or email for login
  const [password, setPassword] = useState("");
 
  // signup fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
 
  const switchTo = (m) => {
    setError("");
    setMode(m);
  };
 
  const onLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!identity.trim() || !password) {
      setError("Please enter your email/username and password.");
      return;
    }
    setLoading(true);
    try {
      const user = login({ identity: identity.trim(), password });
      // after login, redirect back to requested page (from) or home
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };
 
  const onSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill all signup fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const user = signup({ username: username.trim(), email: email.trim(), password });
      // after signup, redirect back to requested page
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign up");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className={styles.page}>
      {/* Background layers */}
      <div className={styles.bg} />
      <div className={styles.overlay} />
 
      {/* Centered card */}
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h2 className={styles.brand}>ReelFlix</h2>
 
            <div className={styles.toggle}>
              <button
                type="button"
                className={mode === "login" ? styles.activeToggle : styles.inactiveToggle}
                onClick={() => switchTo("login")}
              >
                Sign In
              </button>
 
              <button
                type="button"
                className={mode === "signup" ? styles.activeToggle : styles.inactiveToggle}
                onClick={() => switchTo("signup")}
              >
                Sign Up
              </button>
            </div>
          </header>
 
          {mode === "login" ? (
            <form onSubmit={onLogin} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
 
              <label className={styles.label}>
                Email or Username
                <input
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className={styles.input}
                  placeholder="you@example.com or username"
                />
              </label>
 
              <label className={styles.label}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Your password"
                />
              </label>
 
              <button className={styles.primary} type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
 
              <div className={styles.small}>
                New to ReelFlix?{" "}
                <button type="button" className={styles.linkBtn} onClick={() => switchTo("signup")}>
                  Create an account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onSignup} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
 
              <label className={styles.label}>
                Choose a username
                <input value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} placeholder="Visible name" />
              </label>
 
              <label className={styles.label}>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="you@example.com" />
              </label>
 
              <label className={styles.label}>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Choose a password" />
              </label>
 
              <button className={styles.primary} type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
 
              <div className={styles.small}>
                Already have an account?{" "}
                <button type="button" className={styles.linkBtn} onClick={() => switchTo("login")}>
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}