import { useState, useCallback } from "react";

// Default callbacks arguments for the custom hook
const defaultCallbacks = {
  onCommentModified: () => {},
  onCommentDeleted: () => {},
};

// Custom hook for the manipulation of individual comments
export default function useComment(postId, comment, callbacks = defaultCallbacks) {
  const [content, setContent] = useState(comment.content);
  const [isSubmitting] = useState(false);

  const handleContentChange = useCallback((e) => setContent(e.target.value), []);

  const resetModifContent = useCallback(() => setContent(comment.content), [comment.content]);

  return {
    content,
    isSubmitting,
    handleContentChange,
    resetModifContent,
  };
}
