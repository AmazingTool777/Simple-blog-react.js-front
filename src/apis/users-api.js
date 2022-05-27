import axios from "axios";
import apiConfig from "../configs/api-config";

const ENDPOINT = `${apiConfig.URL}/users`;

// Signs up a user
async function signupUser(signupData) {
	const ENDPOINT = `${apiConfig.URL}/signup`;
	const response = (await axios.post(ENDPOINT, signupData)).data;
	localStorage.setItem("access-token", response.token); // Storing the tokens
	return response.user;
}

// Authenticates a user from the access-token
async function authenticateUserFromToken() {
	const ENDPOINT = `${apiConfig.URL}/tokenUser`;
	const token = localStorage.getItem("access-token");
	return (await axios.get(ENDPOINT, { headers: { Authorization: `Bearer ${token}` } })).data;
}

// Logs in a user
async function loginUser(credentials) {
	const ENDPOINT = `${apiConfig.URL}/login`;
	const response = (await axios.post(ENDPOINT, credentials)).data;
	localStorage.setItem("access-token", response.token); // Storing the tokens
	return response.user;
}

// Gets users
async function fetchUsers(page = 1, limit = 12, order = "DESC", search = "") {
	const URL = `${ENDPOINT}?page=${page}&limit=${limit}&order=${order}&search=${search}`;
	return (await axios.get(URL)).data;
}

// Gets a user
async function fetchUser(id) {
	const URL = `${ENDPOINT}/${id}`;
	return (await axios.get(URL)).data;
}

export { signupUser, authenticateUserFromToken, loginUser, fetchUsers, fetchUser };
