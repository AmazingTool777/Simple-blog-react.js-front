import { useState } from "react";

// Other custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// Categories api call
import { fetchPaginatedCategories } from "../../apis/categories-api";

// Custom hook for the categories data
function usePostsCategories(merge = false) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // A number of forced fetches
  const [forceNb, setForceNb] = useState(1);

  const handlePageChange = (page) => setPage(page > pages ? pages : page);

  // Forces to fetch the categories at page 1
  const triggerInitialCategoriesFetch = () => {
    setPage(1);
    setForceNb(forceNb + 1);
  };

  const [categories, isLoading, count, pages, error, reset] = usePaginatedApiCall(
    () => {
      const LIMIT = 12;
      return fetchPaginatedCategories(page, LIMIT, search);
    },
    {
      merge,
      key: merge ? "_id" : null,
    },
    [page, search, forceNb]
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
    triggerInitialCategoriesFetch,
  };
}

export default usePostsCategories;
