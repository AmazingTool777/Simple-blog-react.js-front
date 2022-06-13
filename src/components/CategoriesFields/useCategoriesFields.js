import { useCallback } from "react";

// API calls
import { fetchPaginatedCategories } from "../../apis/categories-api";

// Custom hook for the categories fields component
function useCategoriesFields(onSelectChange) {
  // API call for fetching categories options on input change
  const fetchCategoriesOnInputChange = useCallback(async (value) => {
    try {
      const paginatedCategories = await fetchPaginatedCategories(1, 12, value);
      return paginatedCategories.rows.map((category) => ({ value: category._id, label: category.label }));
    } catch (error) {
      return [];
    }
  }, []);

  // Handles the change of the selection
  const handleSelectionChange = useCallback(
    (selectedCategories) => {
      onSelectChange(selectedCategories.map((selected) => ({ _id: selected.value, label: selected.label })));
    },
    [onSelectChange]
  );

  return { fetchCategoriesOnInputChange, handleSelectionChange };
}

export default useCategoriesFields;
