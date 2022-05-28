import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API calls
import { fetchUser } from "../../apis/users-api";

// Other custom hooks
import useToasts from "../../hooks/useToasts";

// Custom hook for the user page
export default function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { userId } = useParams();

  const { handleToastAdd } = useToasts();

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then((user) => {
        setLoading(false);
        setHasFetched(true);
        setUser(user);
      })
      .catch((error) => {
        setLoading(false);
        setUser(null);
        handleToastAdd({
          type: "BROWSING_MESSAGE",
          message: {
            title: (
              <>
                <FontAwesomeIcon icon="times-circle" className="me-2 text-danger" />
                {error.status < 500 ? "404 not found" : "Server error"}
              </>
            ),
            content: (
              <p className="text-danger mb-0">
                {error.status < 500
                  ? "We cannot find the requested user."
                  : "A server error occured. Please try again."}
              </p>
            ),
            duration: 5000,
          },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { user, isLoading, hasFetched };
}
