import { useReducer, useEffect } from "react";
import _ from "lodash";

const initialState = {
  rows: [],
  isLoading: false,
  count: 0,
  pages: 1,
  error: null,
};

const ACTIONS = {
  DATA_LOADING: "DATA_LOADING",
  DATA_FETCHED: "DATA_FETCHED",
  FETCH_ERROR: "FETCH_ERROR",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DATA_LOADING:
      return { ...state, isLoading: true };

    case ACTIONS.DATA_FETCHED: {
      const { paginatedResults, merge, key } = action.payload;
      return {
        isLoading: false,
        rows: !merge ? paginatedResults.rows : _.unionBy(paginatedResults.rows, state.rows, key),
        count: paginatedResults.count,
        pages: paginatedResults.pages,
        error: null,
      };
    }

    case ACTIONS.FETCH_ERROR:
      return { ...state, isLoading: false, rows: [], error: action.payload.error };

    case ACTIONS.RESET:
      return { isLoading: false, rows: [], count: 0, pages: 1, error: null };

    default:
      new Error("Unknown dispatch action");
  }
}

// Custom hook for the process of a paginated API call
function usePaginatedApiCall(apiCall, options, dependencies) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { rows, isLoading, count, pages, error } = state;

  // Reset dispatcher method
  const reset = () => dispatch({ type: ACTIONS.RESET });

  useEffect(() => {
    dispatch({ type: ACTIONS.DATA_LOADING });
    apiCall()
      .then((paginatedResults) => {
        const _options = options ? options : { merge: false, key: null };
        dispatch({
          type: ACTIONS.DATA_FETCHED,
          payload: { paginatedResults, merge: _options.merge, key: _options.key },
        });
      })
      .catch((error) => {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return [rows, isLoading, count, pages, error, reset];
}

export default usePaginatedApiCall;
