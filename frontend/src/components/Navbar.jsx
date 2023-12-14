import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import '../styles/NavBar.css';

const NavBar = ({ isLoggedIn, onLogout, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Write Now
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {!isLoggedIn ? (
            <Nav className="ms-auto"> 
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <NavDropdown title={userEmail} id="basic-nav-dropdown" alignright="true">
                <NavDropdown.Item as={Link} to="/my-profile">
                  Your Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/all-collections">
                  Collections
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
