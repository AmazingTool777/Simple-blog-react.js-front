import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";

// Custom hook for the addition of a new comment
export default function useNewComment(post) {
  const [content, setContent] = useState("");

  const { isLoggedIn } = useCurrentUser();

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

  return {
    content,
    handleContentChange,
    handleContentFocus,
  };
}
