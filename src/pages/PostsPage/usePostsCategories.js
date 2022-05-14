import { useState } from "react";

// Other custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// Categories api call
import { fetchPaginatedCategories } from "../../apis/categories-api";

// Custom hook for the categories data
function usePostsCategories() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const [categories, isLoading, count, pages] = usePaginatedApiCall(() => {
		const LIMIT = 12;
		return fetchPaginatedCategories(page, LIMIT, search);
	}, [page, search]);

	return {
		categories,
		page,
		search,
		handlePageChange: setPage,
		handleSearchChange: setSearch,
		isLoading,
		count,
		pages,
	};
}

export default usePostsCategories;
