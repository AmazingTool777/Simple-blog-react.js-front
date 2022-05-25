import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUsers from "./useUsers";

// Components
import UsersParams from "./UsersParams";
import UserCard, { UserCardLoaders } from "./UserCard";

const UsersPage = () => {
	const { users, order, page, pages, isLoading, count, handleOrderChange, handleSearchChange } = useUsers();

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
			<Row className="mt-4">
				{(page !== 1 || !isLoading) &&
					users.map((user) => (
						<Col key={user._id} xs={12} md={6} lg={4}>
							<UserCard user={user} />
						</Col>
					))}
				{isLoading && (
					<>
						<Col xs={12} md={6} lg={4}>
							<UserCardLoaders />
						</Col>
						<Col xs={12} md={6} lg={4}>
							<UserCardLoaders />
						</Col>
					</>
				)}
				{!isLoading && page === pages && (
					<Col xs={12}>
						<p className="text-center text-secondary">End of results.</p>
					</Col>
				)}
			</Row>
		</section>
	);
};

export default UsersPage;
