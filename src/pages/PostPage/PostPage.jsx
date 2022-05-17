import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PostPage.css";

// Utils
import { getDateISO, getTimeISO } from "../../utils/dates-utils";

// Custom hooks
import usePost from "./usePost";

// Components
import UserAvatar from "../../components/UserAvatar";

const PostPage = () => {
	const { postId } = useParams();

	const { post, isLoading } = usePost(postId);

	const navigate = useNavigate();

	return (
		<section id="post-page">
			<nav className="d-flex align-items-center">
				<Button
					type="button"
					title="Go back"
					variant="light"
					className="text-secondary fw-bolder me-3"
					onClick={() => navigate(-1)}
				>
					<FontAwesomeIcon icon="arrow-left" />
				</Button>
				<Breadcrumb listProps={{ className: "mb-0" }}>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/posts" }}>
						Posts
					</Breadcrumb.Item>
					{!isLoading && post && (
						<Breadcrumb.Item
							linkAs={"strong"}
							active={false}
							linkProps={{ className: "text-decoration-none text-dark" }}
						>
							{post.title}
						</Breadcrumb.Item>
					)}
				</Breadcrumb>
			</nav>
			<hr />
			{!isLoading && post && (
				<article id="post-article" className="pt-4">
					<h1 className="mb-4 text-center">{post.title}</h1>
					<section className="author-section mb-3 mx-auto">
						<UserAvatar />
						<strong className="author-name">
							<Link to={`/users/${post.author._id}`} className="text-decoration-none">
								{post.author.firstName} {post.author.lastName}
							</Link>
							<FontAwesomeIcon icon="pen-alt" className="ms-2 text-muted" />
						</strong>
						<p className="post-publish-date mb-0 text-secondary">
							<FontAwesomeIcon icon="clock" className="me-2" />
							<em className="text-dark fst-normal">{getDateISO(post.createdAt)}</em> at{" "}
							<em className="text-dark fst-normal">{getTimeISO(post.createdAt)}</em>
						</p>
					</section>
					<figure id="post-illutration">
						<img src={post.photoURL} alt={"Post illustration"} />
					</figure>
				</article>
			)}
		</section>
	);
};

export default PostPage;
