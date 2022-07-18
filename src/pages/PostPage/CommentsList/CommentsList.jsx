import Spinner from "react-bootstrap/Spinner";

// Components
import CommentBullet, { CommentBulletLoaders } from "../CommentBullet";

const CommentsList = ({ comments, page, isLoading, hasFetched, post, count, onCommentModified, onCommentDeleted }) => {
  return isLoading && page === 1 && !hasFetched ? (
    <CommentBulletLoaders />
  ) : (
    <div id="comments-list-section">
      {count === 0 && (
        <div className="empty-comments-placeholder d-flex flex-column align-items-center">
          <p className="text-secondary text-center">Be the first to comment</p>
        </div>
      )}
      {count > 0 && (
        <>
          <ul className="list-unstyled m-0 p-0">
            {comments.map((comment) => (
              <li key={`comment-${comment._id}`} className="mb-2">
                <CommentBullet
                  post={post}
                  comment={comment}
                  onCommentModified={onCommentModified}
                  onCommentDeleted={onCommentDeleted}
                />
              </li>
            ))}
          </ul>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="secondary" size="lg" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentsList;
