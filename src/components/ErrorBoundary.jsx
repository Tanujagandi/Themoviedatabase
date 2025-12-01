import React, { Component } from "react";
import styles from "./ErrorBoundary.module.css";
 
/**
 * ErrorBoundary Component
 * Catches JavaScript errors in child components and displays a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
 
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
 
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }
 
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
 
    return this.props.children;
  }
}
 
export default ErrorBoundary;