import { useState } from "react";

// Other custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// Categories api call
import { fetchPaginatedCategories } from "../../apis/categories-api";

// Custom hook for the categories data
function usePostsCategories(merge = false) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handlePageChange = (page) => setPage(page > pages ? pages : page);

  const [categories, isLoading, count, pages, error, reset] = usePaginatedApiCall(
    () => {
      const LIMIT = 12;
      return fetchPaginatedCategories(page, LIMIT, search);
    },
    {
      merge,
      key: merge ? "_id" : null,
    },
    [page, search]
  );

  return {
    categories,
    page,
    search,
    handlePageChange,
    handleSearchChange: setSearch,
    isLoading,
    count,
    pages,
    error,
    resetCategories: reset,
  };
}

export default usePostsCategories;
