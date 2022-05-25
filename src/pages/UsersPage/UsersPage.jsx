import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUsers from "./useUsers";

// Components
import UsersParams from "./UsersParams";
import UserCard from "./UserCard";

const UsersPage = () => {
	const { users, order, isLoading, count, handleOrderChange, handleSearchChange } = useUsers();

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
			<p className="text-secondary">
				<strong className="text-dark">{count}</strong> result{count > 1 && "s"}
			</p>
			<hr />
			<div className="users-list">
				<UserCard />
			</div>
		</section>
	);
};

export default UsersPage;
