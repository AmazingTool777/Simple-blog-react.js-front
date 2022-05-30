import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUserPosts from "./useUserPosts";
import useScrollEndObserver from "../../../hooks/useScrollEndObserver";

// Components
import AppSearch from "../../../components/AppSearch";
import PostPreviewCard, { PostPreviewCardLoaders } from "../../../components/PostPreviewCard";
import { ResultsNumberLoader } from "../../../components/Loaders";

const UserPosts = () => {
  const { userId } = useParams();

  const { posts, page, isLoading, count, pages, handlePageChange, handleSearchChange } = useUserPosts(userId);

  const handleEndOfScroll = useCallback(() => {
    if (page < pages && !isLoading) handlePageChange(page + 1);
  }, [handlePageChange, isLoading, page, pages]);

  useScrollEndObserver(handleEndOfScroll);

  return (
    <section>
      <header className="user-posts-header d-flex justify-content-between align-items-end">
        <h2 className="mb-0 fs-3">
          <FontAwesomeIcon icon="newspaper" className="me-3" />
          Posts
        </h2>
        <div>
          {isLoading && page === 1 ? (
            <ResultsNumberLoader />
          ) : (
            <>
              <Badge bg="secondary">{count}</Badge> post{count > 1 && "s"}
            </>
          )}
        </div>
      </header>
      <hr className="mb-4" />
      <div className="user-posts-container">
        <div className="d-flex justify-content-end mb-5">
          <AppSearch placeholder="Search a post" onSearchSubmit={handleSearchChange} />
        </div>
        <Row>
          {(!isLoading || page > 1) &&
            posts.map((post) => (
              <Col key={post._id} xs={12} md={6} lg={4} xlg={3}>
                <PostPreviewCard post={post} />
              </Col>
            ))}
          {isLoading && (
            <Col xs={12} md={6} lg={4} xlg={3}>
              <PostPreviewCardLoaders />
            </Col>
          )}
          {!isLoading && page >= pages && (
            <Col xs={12}>
              <p className="text-center text-secondary">End of results.</p>
            </Col>
          )}
        </Row>
      </div>
    </section>
  );
};

export default UserPosts;
