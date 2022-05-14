import axios from "axios";
import apiConfig from "../configs/api-config";

const ENDPOINT = `${apiConfig.URL}/categories`;

// Fetches paginated categories
async function fetchPaginatedCategories(page = 1, limit = 12, search = "") {
	const response = await axios.get(ENDPOINT, {
		params: { page, limit, search: encodeURI(search) },
	});
	console.log(response.data);
	return response.data;
}

export { fetchPaginatedCategories };
