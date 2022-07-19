import { useEffect, useCallback } from "react";

// Custom hook for running side effects on end of scroll
function useScrollEndObserver(effect) {
  const checkEndOfScroll = useCallback(() => window.innerHeight + window.scrollY >= document.body.offsetHeight, []);

  useEffect(() => {
    const observation = () => {
      if (checkEndOfScroll()) effect();
    };
    window.addEventListener("scroll", observation);
    return () => window.removeEventListener("scroll", observation);
  }, [effect, checkEndOfScroll]);

  return { checkEndOfScroll };
}

// Scroll end observer of a specific DOM element and accepts 2 refs
// One for the scrollable container and the other one for the scrolled content from within
const useContainedScrollEndObserver = (containerRef, contentRef, onScrollEnd) => {
  // Checks if we're at the end of scroll
  const checkEndOfScroll = useCallback((containerRef, contentRef) => {
    return containerRef.current.offsetHeight + containerRef.current.scrollTop >= contentRef.current.offsetHeight;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (checkEndOfScroll(containerRef, contentRef)) onScrollEnd();
    };
    containerRef.current.onscroll = handleScroll;
  }, [onScrollEnd, containerRef, contentRef, checkEndOfScroll]);
};

export default useScrollEndObserver;
export { useContainedScrollEndObserver };
