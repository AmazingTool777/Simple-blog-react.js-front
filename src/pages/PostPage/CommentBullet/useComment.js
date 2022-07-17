import { useState, useCallback } from "react";

// API calls
import { modifyPostComment } from "../../../apis/posts-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";

// Default callbacks arguments for the custom hook
const defaultCallbacks = {
  onCommentModified: () => {},
  onCommentDeleted: () => {},
};

// Custom hook for the manipulation of individual comments
export default function useComment(postId, comment, callbacks = defaultCallbacks) {
  const [content, setContent] = useState(comment.content);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleContentChange = useCallback((e) => setContent(e.target.value), []);

  const resetModifContent = useCallback(() => setContent(comment.content), [comment.content]);

  const { currentUser } = useCurrentUser();

  const { onCommentModified } = callbacks;

  const handleCommentModifSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const commentData = { content };
      setSubmitting(true);
      try {
        const modifiedComment = await modifyPostComment(postId, comment._id, commentData);
        // Setting the user field to the current user object
        modifiedComment.user = currentUser;
        setSubmitting(false);
        onCommentModified(modifiedComment);
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
    [comment._id, content, onCommentModified, postId, currentUser]
  );

  return {
    content,
    isSubmitting,
    handleContentChange,
    resetModifContent,
    handleCommentModifSubmit,
  };
}
