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
import UserPageLoaders from "./UserPageLoaders";

const UserPage = () => {
  const { user, isLoading, hasFetched } = useUser();

  const fullName = user ? `${user.firstName} ${user.lastName}` : null;

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
            <article className="mt-5">
              <div className="profile-layout d-flex align-items-start">
                <UserAvatar
                  className="profile-avatar"
                  src={user.photoURL}
                  alt={`${fullName}'s profile photo`}
                  gender={user.gender}
                />
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
            </article>
          )}
          {!user && hasFetched && <NotFoundFiller />}
        </>
      )}
    </section>
  );
};

export default UserPage;
