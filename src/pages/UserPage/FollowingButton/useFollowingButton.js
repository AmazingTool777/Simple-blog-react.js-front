import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// API calls
import { addFollowing, removeFollowing } from "../../../apis/users-api";

// Other custom hooks
import useCurrentUser from "../../../hooks/useCurrentUser";
import useToasts from "../../../hooks/useToasts";

// Options for the custom hook
const defaultOptions = {
  onFollowingChange: () => {},
};

// Custom hook for the handling the following in the following button component
export default function useFollowingButton(user, options = defaultOptions) {
  const [isSubmitting, setSubmitting] = useState(false);

  const { following } = user;

  const fullName = `${user.firstName} ${user.lastName}`;

  const { onFollowingChange } = options;

  const { isLoggedIn } = useCurrentUser();

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const location = `${pathname}${search}`;

  const { handleToastAdd } = useToasts();

  const handleFollowingToggle = useCallback(async () => {
    if (!isLoggedIn) return navigate("/auth/login", { state: { from: location } });
    setSubmitting(true);
    try {
      const isFollowing = !!following;
      let _following;
      if (isFollowing) {
        await removeFollowing(following._id, user._id);
        _following = null;
      } else _following = await addFollowing(user._id);
      onFollowingChange(_following);
      handleToastAdd({
        type: "OPERATION_MESSAGE",
        message: {
          title: (isFollowing ? "Removed from" : "Added to") + " followings",
          content: isFollowing ? (
            <>
              You no longer follow <strong className="fw-semibold">{fullName}</strong>
            </>
          ) : (
            <>
              You now follow <strong>{fullName}</strong>
            </>
          ),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }, [following, isLoggedIn, location, navigate, onFollowingChange, user._id, handleToastAdd, fullName]);

  return { isSubmitting, handleFollowingToggle };
}
