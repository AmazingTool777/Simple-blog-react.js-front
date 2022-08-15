import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./UserPage.css";

// Utils
import { getDateISO } from "../../utils/dates-utils";

// Custom hooks
import useUser from "./useUser";

// Components
import AppBreadcrumbNav from "../../components/AppBreadcrumbNav";
import UserAvatar from "../../components/UserAvatar";
import NotFoundFiller from "../../components/NotFoundFiller";
import UserPosts from "./UserPosts";
import UserPageLoaders from "./UserPageLoaders";
import FollowingButton from "./FollowingButton";

const UserPage = () => {
  const { user, isLoading, hasFetched, handleUserChange } = useUser();

  const fullName = user ? `${user.firstName} ${user.lastName}` : null;
  const alt = `${fullName}'s profile photo`;

  return (
    <section id="user-page">
      <AppBreadcrumbNav
        isLoading={isLoading}
        basePath="/users"
        baseEntity="Users"
        title={user ? fullName : null}
        notFoundMessage="User not found"
      />
      {isLoading ? (
        <UserPageLoaders />
      ) : (
        <>
          {user && (
            <article className="my-5">
              <div className="profile-layout d-flex justify-content-between align-items-start flex-wrap">
                <div className="d-flex align-items-start mb-3">
                  <UserAvatar className="profile-avatar" src={user.photoURL} alt={alt} gender={user.gender} />
                  <div className="profile-info flex-fill ms-3 ms-md-4">
                    <h1 className="user-name fs-3 mb-3">{fullName}</h1>
                    <p className="user-email mb-2">
                      <FontAwesomeIcon icon="envelope" className="me-2 text-secondary" />
                      <Badge as="em" bg="secondary" className="fw-bolder fst-normal">
                        {user.email}
                      </Badge>
                    </p>
                    <p className="user-join_date text-dark fst-italic">
                      <FontAwesomeIcon icon="clock" className="me-2 text-secondary" />
                      Member since <strong className="text-secondary">{getDateISO(user.createdAt)}</strong>
                    </p>
                  </div>
                </div>
                <FollowingButton user={user} onUserChange={handleUserChange} />
              </div>
            </article>
          )}
          {!user && hasFetched && <NotFoundFiller />}
        </>
      )}
      {hasFetched && user && <UserPosts />}
    </section>
  );
};

export default UserPage;
