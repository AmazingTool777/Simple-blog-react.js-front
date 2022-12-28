import { useCallback, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PostPage.css";

// Utils
import { getDateISO, getTimeISO } from "../../utils/dates-utils";

// Contexts
import { useSocket } from "../../contexts/socket";

// Custom hooks
import usePost from "../../hooks/usePost";
import useCurrentUser from "../../hooks/useCurrentUser";

// Components
import UserAvatar from "../../components/UserAvatar";
import CategoryBullet from "../../components/CategoryBullet";
import PostPageLoaders from "./PostPageLoaders";
import AppBreadcrumbNav from "../../components/AppBreadcrumbNav";
import LikesCommentsBar from "./LikesCommentsBar";
import CommentsSection from "./CommentsSection";

const PostPage = () => {
  const newCommentInputRef = useRef(null);

  const handleNewCommentClick = useCallback(() => newCommentInputRef.current.focus(), []);

  const { postId } = useParams();

  const { socket } = useSocket();

  const { isLoggedIn } = useCurrentUser();

  const { post, isLoading, handlePostChange } = usePost(postId, isLoggedIn);
  const author = post ? post.author : null;

  // Setup of the post view and post left events system
  useEffect(() => {
    socket.emit("post_view", postId);
    return () => {
      socket.emit("post_leave", postId);
    };
  }, [socket, postId]);

  const authorImgAlt = author ? `${author.firstName} ${author.lastName}'s photo` : "The author";

  return (
    <section id="post-page">
      <AppBreadcrumbNav
        isLoading={isLoading}
        basePath="/posts"
        baseEntity="Posts"
        title={post ? post.title : null}
        notFoundMessage="Post not found"
      />
      {isLoading && <PostPageLoaders />}
      {!isLoading && post && (
        <article id="post-article" className="pt-4">
          <h1 className="mb-4 text-center">{post.title}</h1>
          <section className="author-section mb-3 mx-auto">
            <UserAvatar src={author.photoURL} gender={author.gender} alt={authorImgAlt} />
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
          <p className="post-content lead my-4">{post.content}</p>
          <section className="post-categories">
            <h5 className="text-muted mb-3">Categories:</h5>
            {post.categories.length > 0 ? (
              <ul className="list-unstyled d-flex flex-wrap">
                {post.categories.map((category) => (
                  <li key={category._id} className="me-3 mb-2">
                    <CategoryBullet isActive={true} category={category} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">No categories</p>
            )}
          </section>
          <LikesCommentsBar
            post={post}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            onNewCommentClick={handleNewCommentClick}
            onPostChange={handlePostChange}
          />
          <CommentsSection newCommentInputRef={newCommentInputRef} post={post} onPostChange={handlePostChange} />
        </article>
      )}
    </section>
  );
};

export default PostPage;
