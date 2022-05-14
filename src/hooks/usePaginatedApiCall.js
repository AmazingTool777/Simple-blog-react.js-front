import { useReducer, useEffect } from "react";

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
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.DATA_LOADING:
			return { ...state, isLoading: true };

		case ACTIONS.DATA_FETCHED:
			return {
				isLoading: false,
				rows: action.payload.rows,
				count: action.payload.count,
				pages: action.payload.pages,
				error: null,
			};

		case ACTIONS.FETCH_ERROR:
			return { ...state, isLoading: false, rows: [], error: action.payload.error };

		default:
			new Error("Unknown dispatch action");
	}
}

// Custom hook for the process of a paginated API call
function usePaginatedApiCall(apiCall, dependencies) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { rows, isLoading, count, pages, error } = state;

	useEffect(() => {
		dispatch({ type: ACTIONS.DATA_LOADING });
		apiCall()
			.then((paginatedResults) => {
				dispatch({ type: ACTIONS.DATA_FETCHED, payload: paginatedResults });
			})
			.catch((error) => {
				dispatch({ type: ACTIONS.FETCH_ERROR, payload: error });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies]);

	return [rows, isLoading, count, pages, error];
}

export default usePaginatedApiCall;
