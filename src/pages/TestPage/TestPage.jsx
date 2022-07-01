import { useState } from "react";

// API calls
import { fetchPaginatedPosts } from "../../apis/posts-api";

// Custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// Styles
import "./TestPage.css";

const TestPage = () => {
  const [page, setPage] = useState(1);

  const [posts, isLoading, count, pages] = usePaginatedApiCall(
    () => {
      const LIMIT = 2;
      return fetchPaginatedPosts(page, LIMIT, "desc", "");
    },
    {
      merge: true,
      key: "_id",
      isInitial: page === 1,
    },
    [page]
  );

  return (
    <div id="test-page">
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
      {isLoading && <p>Loading ...</p>}
      {page >= pages && <p>End of results</p>}
      <div>
        <button onClick={() => setPage(page + 1)}>+</button>
      </div>
      <p>{count} results</p>
    </div>
  );
};

export default TestPage;
