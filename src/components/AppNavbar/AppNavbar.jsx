import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";

// Contexts
import { useSignupDialog } from "../../contexts/signoutDialog";

const AppNavbar = () => {
  const { isLoggedIn } = useCurrentUser();

  const { handleSignoutModalShow } = useSignupDialog();

  return (
    <Navbar bg="primary" variant="dark" expand="md" sticky="top" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={NavLink} to="/">
          📰 Simple-blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar" />
        <Navbar.Collapse id="app-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-post">
              Create a post
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown title="Personal space">
                <NavDropdown.Item as={NavLink} to="/personal-space/account">
                  <FontAwesomeIcon icon="user" className="me-2" />
                  My account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/personal-space/posts">
                  <FontAwesomeIcon icon="newspaper" className="me-2" />
                  My posts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <div className="d-grid">
                  <Button type="button" variant="secondary" onClick={() => handleSignoutModalShow(true)}>
                    <FontAwesomeIcon icon="sign-out-alt" className="me-2" />
                    Sign out
                  </Button>
                </div>
              </NavDropdown>
            ) : (
              <NavDropdown title="Authentication">
                <NavDropdown.Item as={NavLink} to="/auth/signup">
                  <FontAwesomeIcon icon="user-plus" className="me-2" />
                  Sign up
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/auth/login">
                  <FontAwesomeIcon icon="lock" className="me-2" />
                  Sign in
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
