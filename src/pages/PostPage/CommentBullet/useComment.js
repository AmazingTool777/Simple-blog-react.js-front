import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { modifyPostComment, deletePostComment } from "../../../apis/posts-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";
import useToasts from "../../../hooks/useToasts";

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

  const { onCommentModified, onCommentDeleted } = callbacks;

  const { handleToastAdd } = useToasts();

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

  const handleCommentDelete = useCallback(async () => {
    setSubmitting(true);
    try {
      await deletePostComment(postId, comment._id);
      setSubmitting(false);
      onCommentDeleted(comment._id);
      handleToastAdd({
        type: "OPERATION_MESSAGE",
        message: {
          title: (
            <>
              <FontAwesomeIcon icon="check-circle" className="me-2 text-success" />
              Comment deleted
            </>
          ),
          content: <p className="m-0 text-success">Your comment has been deleted successfully</p>,
        },
      });
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      handleToastAdd({
        type: "OPERATION_MESSAGE",
        message: {
          title: (
            <>
              <FontAwesomeIcon icon="times-circle" className="me-2 text-danger" />
              Failed to delete comment
            </>
          ),
          content: <p className="m-0 text-danger">An error occured while deleting your comment</p>,
        },
      });
    }
  }, [comment._id, onCommentDeleted, postId, handleToastAdd]);

  return {
    content,
    isSubmitting,
    handleContentChange,
    resetModifContent,
    handleCommentModifSubmit,
    handleCommentDelete,
  };
}
