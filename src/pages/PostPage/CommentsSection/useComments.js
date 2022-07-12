import { useState, useEffect, useCallback } from "react";

// API calls
import { fetchPaginatedComments } from "../../../apis/posts-api";

// Other custom hooks
import usePaginatedApiCall from "../../../hooks/usePaginatedApiCall";
import useScrollEndObserver from "../../../hooks/useScrollEndObserver";

const emptyFunction = () => {};

// Custom hook for handling the list of comments
export default function useComments(post, onCountChange = emptyFunction) {
  const [page, setPage] = useState(1);

  const [comments, isLoading, count, pages] = usePaginatedApiCall(
    () => {
      const LIMIT = 10;
      return fetchPaginatedComments(post._id, page, LIMIT);
    },
    {
      merge: true,
      key: "_id",
      isInitial: page === 1,
    },
    [page]
  );

  useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  const handleEndOfScroll = useCallback(() => page < pages && setPage(page + 1), [pages, page]);
  useScrollEndObserver(handleEndOfScroll);

  const handleCommentAdded = useCallback(() => {}, []);

  const handleCommentModified = useCallback(() => {}, []);

  const handleCommentDeleted = useCallback(() => {}, []);

  return {
    comments,
    page,
    isLoading,
    count,
    pages,
    handleCommentAdded,
    handleCommentModified,
    handleCommentDeleted,
  };
}
