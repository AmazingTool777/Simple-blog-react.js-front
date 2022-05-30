import { useState, useCallback } from "react";

// API calls
import { fetchPaginatedPosts } from "../../../apis/posts-api";

// Other custom hooks
import usePaginatedApiCall from "../../../hooks/usePaginatedApiCall";

// Custom hook for the user post component
export default function useUserPosts(authorId) {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const [posts, isLoading, count, pages] = usePaginatedApiCall(
    () => {
      const LIMIT = 12;
      return fetchPaginatedPosts(page, LIMIT, order, search, authorId);
    },
    {
      merge: true,
      key: "_id",
      isInitial: page === 1,
    },
    [page, order, search, authorId]
  );

  const handleOrderChange = useCallback((order) => {
    setPage(1);
    setOrder(order);
  }, []);

  const handleSearchChange = useCallback((search) => {
    setPage(1);
    setSearch(search);
  }, []);

  return {
    posts,
    page,
    order,
    search,
    isLoading,
    count,
    pages,
    handlePageChange: setPage,
    handleOrderChange,
    handleSearchChange,
  };
}
