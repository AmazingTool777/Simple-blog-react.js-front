import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import PostsParams from "./PostsParams";
import PostsCategories from "./PostsCategories";

// Custom hooks
import usePosts from "./usePosts";

const PostsPage = () => {
  const { order, categoryId, handleOrderChange, handleSearchChange, handleCategoryIdChange, isLoading } = usePosts();

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
    </section>
  );
};

export default PostsPage;
