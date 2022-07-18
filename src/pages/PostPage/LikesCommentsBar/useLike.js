import { useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// API calls
import { addPostLike, removeLikeFromPost } from "../../../apis/posts-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";

// Default callbacks for the custom hook
const defaultCallbacks = {
  onPostChange: () => {},
};

// Custom hook for handling the like/unlike for a post by the current user
export default function useLike(post, callbacks = defaultCallbacks) {
  const [isSubmitting, setSubmitting] = useState(false);

  const { onPostChange } = callbacks;

  const handleLikeSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const like = await addPostLike(post._id);
      setSubmitting(false);
      onPostChange({
        ...post,
        like,
        likesCount: post.likesCount + 1,
      });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }, [onPostChange, post]);

  const handleUnlikeSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      await removeLikeFromPost(post._id, post.like._id);
      setSubmitting(false);
      onPostChange({
        ...post,
        like: null,
        likesCount: post.likesCount - 1,
      });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }, [onPostChange, post]);

  const { currentUser, isLoggedIn } = useCurrentUser();

  // Whether the post is liked or not by the current user
  const isLiked = useMemo(() => {
    return !!post.like && post.like.user === currentUser._id;
  }, [currentUser, post.like]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLikeBtnClick = useCallback(() => {
    /*
     * Only an authenticated user can perform an action when the button is clicked
     */
    if (!isLoggedIn) {
      navigate("/auth/login", {
        state: { from: pathname },
      });
      return;
    }
    isLiked ? handleUnlikeSubmit() : handleLikeSubmit();
  }, [isLoggedIn, handleLikeSubmit, isLiked, handleUnlikeSubmit, navigate, pathname]);

  return { isLiked, isSubmitting, handleLikeBtnClick };
}
