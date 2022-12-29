import { useRef, useEffect } from "react";

// Hook for debouncing
export default function useDebounce(cb = () => {}, delay, dependencies) {
  const timeoutRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(cb, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
  }, []);
}
