import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid value updates (e.g. search inputs)
 * Demonstrates useEffect cleanup with clearTimeout.
 *
 * @param {*} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds (default 300ms)
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout if value or delay changes before timeout fires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
