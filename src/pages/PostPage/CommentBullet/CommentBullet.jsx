import { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { getRelativeTime } from "../../../utils/time-utils";

// Custom hooks
import useComment from "./useComment";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useCheckIfUpdated from "../../../hooks/useCheckIfUpdated";

// Components
import UserAvatar from "../../../components/UserAvatar";

const CommentBullet = ({ post, comment, onCommentModified, onCommentDeleted }) => {
  const [modifIsOpen, setModifOpen] = useState(false);
  const [relTime, setRelTime] = useState(getRelativeTime(new Date(comment.createdAt), new Date()).relativeTime);

  const handleCommentModified = useCallback(
    (modifiedComment) => {
      onCommentModified(modifiedComment);
      setModifOpen(false);
    },
    [onCommentModified]
  );

  const { content, isSubmitting, handleContentChange, resetModifContent } = useComment(post._id, comment, {
    onCommentModified: handleCommentModified,
    onCommentDeleted,
  });

  const isUpdated = useCheckIfUpdated();

  useEffect(() => {
    /* When the comment modification is closed, reset the textarea content to its current value */
    isUpdated && !modifIsOpen && resetModifContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifIsOpen, resetModifContent]);

  useEffect(() => {
    /*
     * Gets the next relative time update timeout
     * and sets a timeout that updates the relative time after that amount of time
     * every time the relative time changes
     */
    const { nextUpdateTimeout } = getRelativeTime(new Date(comment.createdAt), new Date());
    const nextRelTimeUpdateTimeout = setTimeout(() => {
      setRelTime(getRelativeTime(new Date(comment.createdAt), new Date()).relativeTime);
    }, nextUpdateTimeout);
    return () => clearTimeout(nextRelTimeUpdateTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relTime]);

  const { currentUser, isLoggedIn } = useCurrentUser();

  const { user } = comment;
  const userAvatarAlt = `${user.firstName} ${user.lastName}'s profile`;

  const belongsToCurrentUser = isLoggedIn ? user._id === currentUser._id : false;

  return (
    <div className="border border-1 rounded-3 py-3 px-2 d-flex align-items-start" style={{ borderColor: "#bbb" }}>
      <UserAvatar className="flex-shrink-0" alt={userAvatarAlt} gender={user.gender} src={user.photoURL} />
      <div className="ms-2 flex-fill">
        <div className="d-flex align-items-center mb-2">
          <h6 className="mb-0">
            <small>
              {user.firstName} {user.lastName}
            </small>
          </h6>
          <small className="ms-2 text-secondary">
            ·{"  "}
            {relTime}
          </small>
        </div>
        {modifIsOpen ? (
          <form>
            <textarea
              rows="2"
              placeholder="Modify your comment"
              className="form-control"
              autoFocus
              value={content}
              disabled={isSubmitting}
              onChange={handleContentChange}
            ></textarea>
            <div className="mt-2">
              <Button type="submit" className="me-2" variant="primary" size="sm" disabled={isSubmitting}>
                Modify
              </Button>
              <Button variant="outline-secondary" size="sm" disabled={isSubmitting} onClick={() => setModifOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="mb-0">{comment.content}</p>
            {belongsToCurrentUser && (
              <div className="d-flex mt-2">
                <button
                  className="btn btn-sm me-2 text-secondary"
                  disabled={isSubmitting}
                  onClick={() => setModifOpen(true)}
                >
                  <small>
                    <FontAwesomeIcon icon="pen" className="me-2" />
                    Modify
                  </small>
                </button>
                <button className="btn btn-sm text-danger" disabled={isSubmitting}>
                  <small>
                    <FontAwesomeIcon icon="eraser" className="me-2" />
                    Delete
                  </small>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentBullet;
