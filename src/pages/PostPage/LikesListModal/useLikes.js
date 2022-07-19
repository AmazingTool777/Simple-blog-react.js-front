import { useState, useEffect } from "react";

// API calls
import { fetchPaginatedPostLikes } from "../../../apis/posts-api";

// Other custom hooks
import usePaginatedApiCall from "../../../hooks/usePaginatedApiCall";

// Default options for the custom hook
const defaultOptions = {
  shouldFetch: true,
};

// Custom hook for handling the list of likes
export default function useLikes(postId, options = defaultOptions) {
  const [page, setPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);

  const { shouldFetch } = options;

  const [likes, isLoading, count, pages, error, reset] = usePaginatedApiCall(
    () => {
      setHasFetched(true);
      const LIMIT = 10;
      return fetchPaginatedPostLikes(postId, page, LIMIT);
    },
    {
      merge: true,
      key: "_id",
      isInitial: page === 1 && !hasFetched,
      blocked: !shouldFetch,
    },
    [page, shouldFetch]
  );

  const handleLikesReset = () => reset();

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  return { likes, page, isLoading, count, pages, handleLikesReset, handlePageChange: setPage };
}
