import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyPostsPage = () => {
  return (
    <section className="my-posts-page">
      <h1 className="pb-1">
        <FontAwesomeIcon icon="newspaper" className="me-4" />
        My posts
      </h1>
      <hr className="mb-5" />
    </section>
  );
};

export default MyPostsPage;
