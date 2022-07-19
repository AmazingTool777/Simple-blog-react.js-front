import { Link } from "react-router-dom";

// Components
import UserAvatar from "../../../components/UserAvatar";

const LikeItem = ({ like }) => {
  const { user } = like;

  const username = `${user.firstName} ${user.lastName}`;

  return (
    <div className="d-flex align-items-center">
      <UserAvatar className="me-2" src={user.photoURL} gender={user.gender} alt={username} />
      <Link to={`/users/${user._id}`} className="username-link">
        {username}
      </Link>
    </div>
  );
};

export default LikeItem;
