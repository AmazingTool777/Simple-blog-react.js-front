import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./LikesCommentBar.css";

// Custom hooks
import useLike from "./useLike";

const LikesCommentsBar = ({ post, likesCount, commentsCount, onNewCommentClick, onPostChange }) => {
  const { isLiked, isSubmitting, handleLikeBtnClick } = useLike(post, { onPostChange });

  let likeBtnClassName = "lc-button btn";
  if (isLiked) likeBtnClassName += " active";

  const likeBtnTitle = isLiked ? "Unlike" : "like";

  return (
    <section id="likes-comments-bar" className="my-4 d-flex">
      <div className="d-flex align-items-center me-4">
        <button className={likeBtnClassName} title={likeBtnTitle} disabled={isSubmitting} onClick={handleLikeBtnClick}>
          <FontAwesomeIcon icon="heart" />
        </button>
        <button className="btn px-1" title="View likes">
          <small className="lc-info">
            {likesCount} like{likesCount > 1 && "s"}
          </small>
        </button>
      </div>
      <div className="d-flex align-items-center">
        <button className="lc-button btn" title="Comment this post" onClick={onNewCommentClick}>
          <FontAwesomeIcon icon="comment" />
        </button>
        <Link to="#comments-list-section" className="btn px-1 text-dark" title="See comments">
          <small className="lc-info">
            {commentsCount} comment{commentsCount > 1 && "s"}
          </small>
        </Link>
      </div>
    </section>
  );
};

export default LikesCommentsBar;
