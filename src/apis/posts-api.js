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

// Fetches a post by id
async function fetchPost(id) {
	const URL = `${ENDPOINT}/${id}`;
	const result = await axios.get(URL);
	return result.data;
}

export { fetchPaginatedPosts, fetchPost };
