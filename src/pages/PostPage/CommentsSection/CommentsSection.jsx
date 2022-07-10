import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Custom hooks
import useNewComment from "./useNewComment";

const CommentsSection = ({ post }) => {
  const { content, isSubmitting, handleContentChange, handleContentFocus, handleCommentSubmit } = useNewComment(post);

  return (
    <section id="post-comments">
      <Form onSubmit={handleCommentSubmit}>
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
    </section>
  );
};

export default CommentsSection;
