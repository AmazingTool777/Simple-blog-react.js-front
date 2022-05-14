import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import PostsParams from "./PostsParams";

const PostsPage = () => {
	return (
		<section id="posts-page">
			<header className="mb-5">
				<h1>
					<FontAwesomeIcon icon="newspaper" className="me-2" />
					Posts
				</h1>
				<hr />
			</header>
			<PostsParams order="desc" onOrderChange={() => {}} onSearchSubmit={() => {}} />
		</section>
	);
};

export default PostsPage;
