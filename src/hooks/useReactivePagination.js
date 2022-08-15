import { useEffect, useCallback, useRef } from "react";

// Custom hook for reactively calculating the correct page of a paginated array
// each time an array item is being added aor removed
export default function useReactivePagination(page, LIMIT, count, setPage) {
  const countPerLastPageRef = useRef(0);

  const handlePageChangeAfterOperation = useCallback(
    (isAdditive) => {
      const operationQuantity = isAdditive ? 1 : -1;
      countPerLastPageRef.current += operationQuantity;
      const { current: countPerLastPage } = countPerLastPageRef;
      if (isAdditive && countPerLastPage > LIMIT && count > 0) setPage((page) => page + 1);
      else if (!isAdditive && page > 1 && countPerLastPage <= 0) setPage((page) => page - 1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, count]
  );

  useEffect(() => {
    const remainder = count % LIMIT;
    countPerLastPageRef.current = remainder === 0 ? LIMIT : remainder;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return { handlePageChangeAfterOperation };
}
