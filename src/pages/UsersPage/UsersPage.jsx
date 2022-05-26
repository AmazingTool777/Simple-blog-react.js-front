import { useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useUsers from "./useUsers";
import useScrollEndObserver from "../../hooks/useScrollEndObserver";

// Components
import UsersParams from "./UsersParams";
import UserCard, { UserCardLoaders } from "./UserCard";
import { ResultsNumberLoader } from "../../components/Loaders";

const UsersPage = () => {
	const { users, order, page, pages, isLoading, count, handleOrderChange, handlePageChange, handleSearchChange } =
		useUsers();

	const handleEndOfScroll = useCallback(() => {
		if (!isLoading && page < pages) handlePageChange(page + 1);
	}, [page, pages, isLoading, handlePageChange]);

	useScrollEndObserver(handleEndOfScroll);

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
				{page === 1 && isLoading ? (
					<ResultsNumberLoader />
				) : (
					<>
						<strong className="text-dark">{count}</strong> result{count > 1 && "s"}
					</>
				)}
			</p>
			<hr />
			<div className="users-list">
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
			</div>
		</section>
	);
};

export default UsersPage;
