import { useState, useEffect } from "react";

// API calls
import { fetchUser } from "../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";

// Custom hook for the current user account page
export default function useMyAccount() {
  const [isLoading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { currentUser, setCurrentUser } = useCurrentUser();

  useEffect(() => {
    setLoading(true);
    fetchUser(currentUser._id)
      .then((user) => {
        setLoading(false);
        setCurrentUser(user);
        !hasFetched && setHasFetched(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user: currentUser, hasFetched, isLoading };
}
