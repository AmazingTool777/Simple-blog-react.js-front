import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Custom hooks
import useNewComment from "./useNewComment";

const CommentsSection = ({ post }) => {
  const { content, handleContentChange, handleContentFocus } = useNewComment(post);

  return (
    <section id="post-comments">
      <Form>
        <Form.Group controlId="post-new-comment" className="mb-3">
          <Form.Label>Your comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Write your thoughts about this post"
            value={content}
            onChange={handleContentChange}
            onFocus={handleContentFocus}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={!content}>
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default CommentsSection;
