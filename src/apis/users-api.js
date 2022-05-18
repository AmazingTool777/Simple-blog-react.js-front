import axios from "axios";
import apiConfig from "../configs/api-config";

// Signs up a user
async function signupUser(signupData) {
	const ENDPOINT = `${apiConfig.URL}/signup`;
	const response = (await axios.post(ENDPOINT, signupData)).data;

	// Storing the tokens
	localStorage.setItem("access-token", response.accessToken);
	localStorage.setItem("refresh-token", response.refreshToken);

	return response.user;
}

export { signupUser };
