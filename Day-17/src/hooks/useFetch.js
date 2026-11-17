import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to encapsulate API fetch lifecycle, loading state, error handling,
 * request aborts on component unmount, and manual refetching.
 *
 * @param {string} url - API Endpoint
 * @param {Array} fallbackData - Optional fallback data if offline or network failure
 */
export function useFetch(url, fallbackData = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Keep a counter to trigger refetches imperatively
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let isMounted = true;
    setLoading(true);
    setError(null);

    async function executeFetch() {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setIsUsingFallback(false);
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          // Request was cancelled; do not update state
          return;
        }
        if (isMounted) {
          console.warn('Network fetch failed, attempting fallback data:', err.message);
          if (fallbackData) {
            setData(fallbackData);
            setIsUsingFallback(true);
            setError(`Live API unreachable (${err.message}). Showing cached mock dataset.`);
          } else {
            setError(err.message);
          }
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
        }
      }
    }

    executeFetch();

    // Cleanup: cancel in-flight request if url changes or component unmounts
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, refetchIndex]);

  return { data, loading, error, refetch, lastUpdated, isUsingFallback };
}
