import { Link, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUserPosts from "../../hooks/useUserPosts";
import useCurrentUser from "../../hooks/useCurrentUser";

// Components
import PostsParams from "../../components/PostsParams";
import PostPreviewCard, { PostPreviewCardLoaders } from "../../components/PostPreviewCard";
import { ResultsNumberLoader } from "../../components/Loaders";

const MyPostsPage = () => {
  const { currentUser } = useCurrentUser();

  const { posts, page, order, isLoading, count, pages, handleOrderChange, handleSearchChange } = useUserPosts(
    currentUser._id
  );

  const { pathname, search } = useLocation();
  const location = `${pathname}${search}`;

  return (
    <section className="my-posts-page">
      <h1 className="pb-1">
        <FontAwesomeIcon icon="newspaper" className="me-4" />
        My posts
      </h1>
      <hr className="mb-5" />
      <PostsParams
        isDisabled={isLoading}
        order={order}
        onOrderChange={handleOrderChange}
        onSearchSubmit={handleSearchChange}
      />
      <p className="mt-5">
        {isLoading && <ResultsNumberLoader />}
        {!isLoading && (
          <>
            <Badge as="strong" bg="secondary">
              {count}
            </Badge>{" "}
            post{count > 1 && "s"}
          </>
        )}
      </p>
      <hr className="mb-4" />
      <Row>
        {(!isLoading || page > 1) &&
          posts.map((post) => (
            <Col key={post._id} xs={12} lg={6} xlg={4}>
              <PostPreviewCard post={post} linkTo={`${post._id}`} />
            </Col>
          ))}
        {isLoading && (
          <Col xs={12} lg={6} xlg={4}>
            <PostPreviewCardLoaders />
          </Col>
        )}
        {!isLoading && page >= pages && (
          <Col xs={12}>
            <p className="text-center text-secondary mt-3">End of results.</p>
          </Col>
        )}
      </Row>
      <Button
        as={Link}
        to="/add-post"
        state={{ from: location }}
        type="button"
        variant="primary"
        style={{ position: "fixed", right: "1rem", bottom: "1rem", zIndex: "1000" }}
      >
        <FontAwesomeIcon icon="plus" className="me-2" />
        Create a post
      </Button>
    </section>
  );
};

export default MyPostsPage;
