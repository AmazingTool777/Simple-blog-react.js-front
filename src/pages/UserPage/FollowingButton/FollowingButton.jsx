import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FollowingButton = ({ user }) => {
  const { following } = user;

  const variant = following ? "light" : "primary";
  const action = following ? "Unfollow" : "Follow";
  const icon = following ? "times" : "plus";

  return (
    <Button variant={variant} className="fw-semibold">
      <FontAwesomeIcon icon={icon} className="me-2" />
      {action}
    </Button>
  );
};

export default FollowingButton;
