import { useState, useEffect, useCallback } from "react";

// Contexts
import { useSocket } from "../../../contexts/socket";

// API calls
import { fetchPaginatedComments } from "../../../apis/posts-api";

// Other custom hooks
import usePaginatedApiCall from "../../../hooks/usePaginatedApiCall";
import useScrollEndObserver from "../../../hooks/useScrollEndObserver";
import useReactivePagination from "../../../hooks/useReactivePagination";

const emptyFunction = () => {};

// Custom hook for handling the list of comments
export default function useComments(post, onPostChange = emptyFunction) {
  const { socket } = useSocket();

  const [page, setPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);

  const LIMIT = 10;
  const [comments, isLoading, count, pages, error, reset, setCommentsState] = usePaginatedApiCall(
    () => {
      !hasFetched && setHasFetched(true);
      return fetchPaginatedComments(post._id, page, LIMIT);
    },
    {
      merge: true,
      key: "_id",
      isInitial: page === 1 && !hasFetched,
    },
    [page]
  );

  const { handlePageChangeAfterOperation } = useReactivePagination(page, LIMIT, count, setPage);

  const handleCommentAdded = useCallback(
    (addedComment) => {
      const _comments = [...comments];
      _comments.unshift(addedComment);
      _comments.sort((c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime());
      handlePageChangeAfterOperation(true);
      setCommentsState({ rows: _comments, count: count + 1 });
    },
    [comments, count, handlePageChangeAfterOperation, setCommentsState]
  );

  const handleCommentModified = useCallback(
    (modifiedComment) => {
      const index = comments.findIndex((comment) => comment._id === modifiedComment._id);
      const _comments = [...comments];
      _comments[index] = modifiedComment;
      setCommentsState({ rows: _comments });
    },
    [comments, setCommentsState]
  );

  const handleCommentDeleted = useCallback(
    (commentId) => {
      const index = comments.findIndex((comment) => comment._id === commentId);
      const _comments = [...comments];
      _comments.splice(index, 1);
      handlePageChangeAfterOperation(false);
      setCommentsState({ rows: _comments, count: count - 1 });
    },
    [comments, count, handlePageChangeAfterOperation, setCommentsState]
  );

  const onCountChange = useCallback(
    (count) => {
      onPostChange({
        ...post,
        commentsCount: count,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onPostChange]
  );

  // New comment socket event handler
  const handleNewComment = useCallback(
    (data) => {
      handleCommentAdded({
        ...data.payload.comment,
        user: data.payload.user,
        post: data.payload.post,
      });
    },
    [handleCommentAdded]
  );

  // Comment modified socket event handler
  const handleSocketCommentModified = useCallback(
    (data) => {
      handleCommentModified({
        ...data.comment,
        user: data.user,
        post: data.post,
      });
    },
    [handleCommentModified]
  );

  // Comment Deleted socket event handler
  const handleSocketCommentDeleted = useCallback(
    (data) => {
      handleCommentDeleted(data.commentId);
    },
    [handleCommentDeleted]
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, onCountChange]);

  useEffect(() => {
    if (socket) {
      socket.on("comment_added", handleNewComment);
      socket.on("comment_modified", handleSocketCommentModified);
      socket.on("comment_deleted", handleSocketCommentDeleted);

      return () => {
        const events = ["comment_added", "comment_modified", "comment_deleted"];
        events.forEach((e) => socket.off(e));
      };
    }
  }, [socket, handleNewComment, handleSocketCommentModified, handleSocketCommentDeleted]);

  const handleEndOfScroll = useCallback(() => page < pages && setPage(page + 1), [pages, page]);
  useScrollEndObserver(handleEndOfScroll);

  return {
    comments,
    page,
    isLoading,
    count,
    pages,
    hasFetched,
    handleCommentAdded,
    handleCommentModified,
    handleCommentDeleted,
  };
}
