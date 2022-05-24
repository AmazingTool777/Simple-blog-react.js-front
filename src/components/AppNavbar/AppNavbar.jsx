import { useState, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom hooks
import useCurrentUser from "../../hooks/useCurrentUser";

const AppNavbar = () => {
  const [logoutModalShow, setLogoutModalShow] = useState(false);

  const { isLoggedIn, logout } = useCurrentUser();

  // Handles the sign out
  const handleSignout = useCallback(() => {
    logout(() => setLogoutModalShow(false));
  }, [logout]);

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
                  <Button type="button" variant="secondary" onClick={() => setLogoutModalShow(true)}>
                    <FontAwesomeIcon icon="sign-out-alt" className="me-2" />
                    Sign out
                  </Button>
                  <Modal
                    centered
                    size="sm"
                    animation={true}
                    backdrop="static"
                    aria-labelledby="signout-modal"
                    show={logoutModalShow}
                    onHide={() => setLogoutModalShow(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="signout-modal">Sign out confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="fs-5 lead">Do you really want to sign out?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <d-flex className="justify-content-end">
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className="me-3"
                          onClick={() => setLogoutModalShow(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="button" variant="primary" onClick={handleSignout}>
                          Confirm
                        </Button>
                      </d-flex>
                    </Modal.Footer>
                  </Modal>
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
