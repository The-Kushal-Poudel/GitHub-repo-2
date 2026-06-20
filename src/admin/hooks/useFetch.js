import { useState, useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

/**
 * Simple data‑fetching hook used throughout the admin panel.
 * It automatically includes the authentication token via `authenticatedFetch`.
 *
 * @param {string} url - The full URL produced by apiUrl().
 * @param {object} [options] - Fetch options (method, body, etc.).
 * @returns {{ data: any, loading: boolean, error: string }}
 */
export default function useFetch(url, options = {}) {
  const { authenticatedFetch } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      try {
        const response = await authenticatedFetch(url, options);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message || "Fetch error");
        }
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err.message || "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
