import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./UserCard.css";

// Components
import UserAvatar from "../../../components/UserAvatar";

const UserCard = ({ user }) => {
	const navigate = useNavigate();

	return (
		<article className="user-card py-3 px-2 mb-3" onClick={() => navigate(`/users/${user._id}`)}>
			<div className="user-card-layout">
				<UserAvatar
					className="user-card-avatar me-2"
					imgClassName="user-card-avatar-image"
					gender={user.gender}
					src={user.photoURL}
					alt={`${user.firstName} ${user.lastName}'s profile photo`}
				/>
				<p className="user-card-name">
					<strong>
						{user.firstName} {user.lastName}
					</strong>
				</p>
				<p className="user-card-email">
					<FontAwesomeIcon icon="envelope" className="me-2 text-secondary" />
					<Badge as="em" bg="secondary" className="fw-bolder fst-normal">
						{user.email}
					</Badge>
				</p>
			</div>
		</article>
	);
};

export default UserCard;
