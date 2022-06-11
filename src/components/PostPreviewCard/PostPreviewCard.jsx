import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDateISO, getTimeISO } from "../../utils/dates-utils";

// Styles
import "./PostsPreviewCard.css";

const PostsPreviewCard = ({ post, linkTo }) => {
  const navigate = useNavigate();

  return (
    <article>
      <Card onClick={() => navigate(linkTo ? linkTo : `/posts/${post._id}`)} className="post-preview-card mb-4">
        <Card.Img variant="top" src={post.photoURL} />
        <Card.Body>
          <Card.Title className="mb-3">{post.title}</Card.Title>
          <Card.Text className="text-primary mb-2">
            <FontAwesomeIcon icon="user" className="me-2" />
            <span className="text-secondary fst-italic">by</span>{" "}
            <Link
              to={`/users/${post.author._id}`}
              className="fw-bolder text-decoration-none"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author.firstName} {post.author.lastName}
            </Link>
          </Card.Text>
          <Card.Text className="fs-6 text-secondary">
            <FontAwesomeIcon icon="clock" className="me-2" />
            <em className="fst-normal fw-bolder">{getDateISO(post.createdAt)}</em>
            <span className="text-dark fst-italic"> at </span>
            <em className="fst-normal fw-bolder">{getTimeISO(post.createdAt)}</em>
          </Card.Text>
        </Card.Body>
      </Card>
    </article>
  );
};

export default PostsPreviewCard;
