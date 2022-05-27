import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// API calls
import { fetchUser } from "../../apis/users-api";

// Custom hook for the user page
export default function useUser() {
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const { userId } = useParams();

	useEffect(() => {
		setLoading(true);
		fetchUser(userId)
			.then((user) => {
				setLoading(false);
				setUser(user);
			})
			.catch((error) => {
				setLoading(false);
				setUser(null);
			});
	}, [userId]);

	return { user, isLoading };
}
