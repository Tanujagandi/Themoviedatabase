import { useState, useEffect } from "react";
import axios from "axios";
 
/**
 * Custom hook for fetching data using Axios
 * Automatically manages loading, error, and data states
 */
 
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (!url) return;
 
    const fetchData = async () => {
      setLoading(true);
      setError(null);
 
      try {
        const response = await axios.get(url);
        setData(response.data); // axios stores actual data in response.data
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [url]);
 
  return { data, loading, error };
};
 
export default useFetch;
 