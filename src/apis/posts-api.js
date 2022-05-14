import axios from "axios";
import apiConfig from "../configs/api-config";

const ENDPOINT = `${apiConfig.URL}/posts`;

// Fetches paginated posts
async function fetchPaginatedPosts(page = 1, limit = 12, order = "desc", search = "") {
	return axios
		.get(ENDPOINT, {
			params: { page, limit, order, search: encodeURI(search) },
		})
		.then((response) => response.data);
}

export { fetchPaginatedPosts };
