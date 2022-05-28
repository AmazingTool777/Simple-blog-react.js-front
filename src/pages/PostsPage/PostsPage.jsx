import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "react-responsive-pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import PostsParams from "./PostsParams";
import PostsCategories from "./PostsCategories";
import PostsPreviewCard, { PostPreviewCardLoaders } from "../../components/PostPreviewCard";
import { ResultsNumberLoader } from "../../components/Loaders";

// Custom hooks
import usePosts from "./usePosts";

const PostsPage = () => {
  const {
    posts,
    page,
    order,
    categoryId,
    handlePageChange,
    handleOrderChange,
    handleSearchChange,
    handleCategoryIdChange,
    isLoading,
    count,
    pages,
  } = usePosts();

  return (
    <section id="posts-page">
      <header className="mb-5">
        <h1>
          <FontAwesomeIcon icon="newspaper" className="me-2" />
          Posts
        </h1>
        <hr />
      </header>
      <PostsParams
        isDisabled={isLoading}
        order={order}
        onOrderChange={handleOrderChange}
        onSearchSubmit={handleSearchChange}
      />
      <PostsCategories isDisabled={isLoading} categoryId={categoryId} onCategoryIdSelect={handleCategoryIdChange} />
      <section className="mt-4">
        {isLoading ? (
          <ResultsNumberLoader />
        ) : (
          <p className="text-secondary">
            <strong className="text-dark">{count}</strong> result{count > 1 && "s"}
          </p>
        )}
        <hr />
        <nav className="mb-5">
          <Pagination
            extraClassName="justify-content-start"
            currentPage={page}
            total={pages}
            onPageChange={handlePageChange}
          />
        </nav>
        <div id="posts-previews-container">
          <Row>
            {isLoading ? (
              <Col xs={12} md={6} lg={4} xlg={3}>
                <PostPreviewCardLoaders />
              </Col>
            ) : (
              <>
                {posts.map((post) => (
                  <Col key={post._id} xs={12} md={6} lg={4} xlg={3}>
                    <PostsPreviewCard post={post} />
                  </Col>
                ))}
                {page >= pages && (
                  <Col xs={12}>
                    <p className="text-center text-secondary">End of results</p>
                  </Col>
                )}
              </>
            )}
          </Row>
        </div>
        <nav className="mt-5">
          <Pagination
            extraClassName="justify-content-start"
            currentPage={page}
            total={pages}
            onPageChange={handlePageChange}
          />
        </nav>
      </section>
    </section>
  );
};

export default PostsPage;
