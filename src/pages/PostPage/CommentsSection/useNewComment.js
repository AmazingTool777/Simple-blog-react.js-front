import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// API calls
import { addPostComment } from "../../../apis/posts-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";

// Custom hook for the addition of a new comment
export default function useNewComment(post, onCommentAdded = () => {}) {
  const [content, setContent] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const { isLoggedIn, currentUser } = useCurrentUser();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleContentChange = useCallback((e) => setContent(e.target.value), []);

  const handleContentFocus = useCallback(() => {
    // Redirecting the current user to authenticate if not logged in
    !isLoggedIn &&
      navigate("/auth/login", {
        state: { from: pathname },
      });
  }, [isLoggedIn, navigate, pathname]);

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const commentData = { content };
      setSubmitting(true);
      try {
        const addedComment = await addPostComment(post._id, commentData);
        // Replace the user as an object id from the server with the current user object
        addedComment.user = currentUser;
        setSubmitting(false);
        setContent("");
        onCommentAdded(addedComment);
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    },
    [content, onCommentAdded, post._id, currentUser]
  );

  return {
    content,
    isSubmitting,
    handleContentChange,
    handleContentFocus,
    handleCommentSubmit,
  };
}
