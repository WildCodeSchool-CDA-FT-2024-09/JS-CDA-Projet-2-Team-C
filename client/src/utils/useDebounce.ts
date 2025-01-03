import { useState, useEffect } from 'react';
// see https://www.dhiwise.com/post/ultimate-guide-to-implementing-react-debounce-effectively

// This hook will return the value that was given to it after the delay
export function useDebounce<T>(inputValue: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}
