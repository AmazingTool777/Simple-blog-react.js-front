import axios from "axios";
import apiConfig from "../configs/api-config";

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

export { signupUser, authenticateUserFromToken };
