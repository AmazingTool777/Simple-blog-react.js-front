import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import "./PersonalSpaceLayout.css";

// Custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";

// Components
import UserAvatar from "../UserAvatar";

const PersonalSpaceLayout = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const username = `${currentUser.firstName} ${currentUser.lastName}`;

  return (
    <section id="personal-space">
      <div className="personal-space-sidebar bg-light shadow pt-2 d-flex flex-column">
        <div className="d-flex align-items-center">
          <Button type="button" variant="light" className="text-secondary" title="Go back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon="arrow-left" />
          </Button>
          <h1 className="personal-space-title text-primary ms-3">/ Personal space</h1>
        </div>
        <div className="flex-fill d-flex flex-column justify-content-center align-items-center px-2">
          <UserAvatar
            id="personal-space-user-avatar"
            className="mb-2"
            gender={currentUser.gender}
            src={currentUser.photoURL}
            alt={username + "'s profile photo"}
          />
          <strong className="fs-5">{username}</strong>
          <nav className="mt-5 w-100">
            <NavLink to="account" className="personal-space-navlink">
              <span className="icon-container me-2">
                <FontAwesomeIcon icon="user" />
              </span>
              Account
            </NavLink>
            <NavLink to="posts" className="personal-space-navlink">
              <span className="icon-container me-2">
                <FontAwesomeIcon icon="newspaper" />
              </span>
              Posts
            </NavLink>
          </nav>
          <div className="d-grid mt-5 w-100">
            <Button size="lg" variant="secondary">
              <FontAwesomeIcon icon="sign-out-alt" className="me-3" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default PersonalSpaceLayout;
