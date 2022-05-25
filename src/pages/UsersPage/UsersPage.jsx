import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUsers from "./useUsers";

// Components
import UsersParams from "./UsersParams";

const UsersPage = () => {
	useUsers();

	return (
		<section id="users-page">
			<header className="mb-5">
				<h1>
					<FontAwesomeIcon icon="users" className="me-3" />
					Users
				</h1>
				<hr />
			</header>
			<UsersParams />
		</section>
	);
};

export default UsersPage;
