import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for fetching data from an API.
 * Supports cleanup, loading state, error handling.
 * Can be used with both REST APIs and GraphQL endpoints.
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    // Cleanup function
    return () => {
      setData(null);
      setLoading(false);
      setError(null);
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
