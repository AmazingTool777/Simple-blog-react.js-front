import { useCallback } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useFollowingButton from "./useFollowingButton";

const FollowingButton = ({ user, onUserChange }) => {
  const { following } = user;

  const handleFollowingChange = useCallback(
    (following) => {
      onUserChange({ following });
    },
    [onUserChange]
  );

  const { isSubmitting, handleFollowingToggle } = useFollowingButton(user, {
    onFollowingChange: handleFollowingChange,
  });

  const variant = following ? "light" : "primary";
  const action = following ? "Unfollow" : "Follow";
  const icon = following ? "times" : "plus";

  return (
    <Button variant={variant} className="fw-semibold" disabled={isSubmitting} onClick={handleFollowingToggle}>
      <FontAwesomeIcon icon={icon} className="me-2" />
      {action}
    </Button>
  );
};

export default FollowingButton;
