import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUsers from "./useUsers";

// Components
import UsersParams from "./UsersParams";

const UsersPage = () => {
	const { users, order, isLoading, handleOrderChange, handleSearchChange } = useUsers();

	useEffect(() => {
		console.log(users);
	}, [users]);

	return (
		<section id="users-page">
			<header className="mb-5">
				<h1>
					<FontAwesomeIcon icon="users" className="me-3" />
					Users
				</h1>
				<hr />
			</header>
			<UsersParams
				isDisabled={isLoading}
				order={order}
				onOrderChange={handleOrderChange}
				onSearchSubmit={handleSearchChange}
			/>
		</section>
	);
};

export default UsersPage;
