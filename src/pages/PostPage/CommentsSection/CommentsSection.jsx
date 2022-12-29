import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useComments from "./useComments";
import useNewComment from "./useNewComment";

// Components
import CommentsList from "../CommentsList";

const CommentsSection = ({ post, newCommentInputRef, onPostChange }) => {
  const {
    comments,
    isLoading,
    hasFetched,
    page,
    someoneIsCommenting,
    handleCommentAdded,
    handleCommentModified,
    handleCommentDeleted,
  } = useComments(post, onPostChange);

  const { content, isSubmitting, handleContentChange, handleContentFocus, handleCommentSubmit } = useNewComment(
    post,
    handleCommentAdded
  );

  return (
    <section id="post-comments">
      <Form onSubmit={handleCommentSubmit} className="mb-4">
        <Form.Group controlId="post-new-comment" className="mb-3">
          <Form.Label>Your comment:</Form.Label>
          <Form.Control
            ref={newCommentInputRef}
            as="textarea"
            rows="3"
            placeholder="Write your thoughts about this post"
            disabled={isSubmitting}
            value={content}
            onChange={handleContentChange}
            onFocus={handleContentFocus}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={!content || isSubmitting}>
          Submit
          {isSubmitting && <Spinner animation="border" variant="light" size="sm" className="ms-2" />}
        </Button>
      </Form>
      {someoneIsCommenting && (
        <div className="mb-4">
          <p className="text-secondary">
            <FontAwesomeIcon icon="pen-alt" className="me-2" />
            Someone is writing a comment ...
          </p>
        </div>
      )}
      <CommentsList
        comments={comments}
        page={page}
        isLoading={isLoading}
        hasFetched={hasFetched}
        post={post}
        count={post.commentsCount}
        onCommentModified={handleCommentModified}
        onCommentDeleted={handleCommentDeleted}
      />
    </section>
  );
};

export default CommentsSection;
