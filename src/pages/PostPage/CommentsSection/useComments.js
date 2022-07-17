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

  const [comments, isLoading, count, pages, error, reset, modifiers] = usePaginatedApiCall(
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

  const handleCommentAdded = useCallback(
    (addedComment) => {
      const _comments = [...comments];
      _comments.unshift(addedComment);
      _comments.sort((c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime());
      modifiers.setRows(_comments);
    },
    [comments, modifiers]
  );

  const handleCommentModified = useCallback(
    (modifiedComment) => {
      const index = comments.findIndex((comment) => comment._id === modifiedComment._id);
      const _comments = [...comments];
      _comments[index] = modifiedComment;
      modifiers.setRows(_comments);
    },
    [comments, modifiers]
  );

  const handleCommentDeleted = useCallback(() => {}, []);

  useEffect(() => {
    // Comments fetch error handler
    error && console.log(error);
  }, [error]);

  // Workaround for getting of unused reset variable
  useEffect(() => {
    return () => false && reset();
  }, [reset]);

  useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  const handleEndOfScroll = useCallback(() => page < pages && setPage(page + 1), [pages, page]);
  useScrollEndObserver(handleEndOfScroll);

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
