import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CommentsSection = ({ post }) => {
  return (
    <section id="post-comments">
      <Form>
        <Form.Group controlId="post-new-comment" className="mb-3">
          <Form.Label>Your comment:</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Write your thoughts about this post" />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default CommentsSection;
