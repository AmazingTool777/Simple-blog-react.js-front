import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Custom hooks
import useComments from "./useComments";
import useNewComment from "./useNewComment";

// Components
import CommentsList from "../CommentsList";

const CommentsSection = ({ post }) => {
  const { comments, isLoading, page, handleCommentAdded, handleCommentModified, handleCommentDeleted } =
    useComments(post);

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
      <CommentsList
        comments={comments}
        page={page}
        isLoading={isLoading}
        post={post}
        count={post.commentsCount}
        onCommentModified={handleCommentModified}
        onCommentDeleted={handleCommentDeleted}
      />
    </section>
  );
};

export default CommentsSection;
