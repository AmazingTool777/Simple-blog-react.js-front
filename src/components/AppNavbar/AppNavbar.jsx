import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppNavbar = () => {
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
              Add a post
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <NavDropdown title="Authentication">
              <NavDropdown.Item as={NavLink} to="/signup">
                <FontAwesomeIcon icon="user-plus" className="me-2" />
                Sign up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/signup">
                <FontAwesomeIcon icon="lock" className="me-2" />
                Log in
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
