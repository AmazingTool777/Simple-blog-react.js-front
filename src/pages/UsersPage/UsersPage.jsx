import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import UsersParams from "./UsersParams";

const UsersPage = () => {
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
