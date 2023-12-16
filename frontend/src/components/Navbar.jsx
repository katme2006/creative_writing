import React, { useState, useEffect,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import '../styles/NavBar.css';
import Logo from '../assets/small_filled_log0.svg';


const NavBar = ({ isLoggedIn, onLogout, userEmail }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [expanded, setExpanded] = useState(false); // New state for controlling the expansion
  const navbarRef = useRef(null); // Reference to the navbar
  const handleLogout = () => {
    onLogout();
    navigate('/');
    setExpanded(false); // Collapse the navbar on logout
  };

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

// Function to handle outside clicks
  const handleClickOutside = (event) => {
  if (navbarRef.current && !navbarRef.current.contains(event.target)) {
    setExpanded(false);
  }
};


useEffect(() => {
  // Add event listener for outside clicks
  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('resize', updateMedia);
  return () => {
    // Clean up the event listener
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('resize', updateMedia);
  };
}, []);

  // Function to handle link click
  const handleNavLinkClick = () => {
    if (isMobile) {
      setExpanded(false);
    }
  };

  return (
  
    <Navbar ref={navbarRef} expand="lg" className="bg-body-tertiary" fixed="top" expanded={expanded}>
      <Container>
      <img
            src={Logo}
            width="30" // Set the logo width as desired
            height="30" // Set the logo height as desired
            className="d-inline-block align-top"
            alt="Write Now Pen Nib Logo"
            className = "penlogo"
          />
        <Navbar.Brand className='logo' as={Link} to="/" onClick={handleNavLinkClick}>
          Write Now
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isLoggedIn ? (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick} className="bordered-link">Login</Nav.Link>
      <Nav.Link as={Link} to="/signup" onClick={handleNavLinkClick} className="bordered-link">Sign Up</Nav.Link>
  
            </Nav>
          ) : (
            <Nav className="ms-auto">
              {isMobile ? (
                <>
                
                  <Nav.Link as={Link} to="/my-profile" onClick={handleNavLinkClick}>Your Profile</Nav.Link>
                  <Nav.Link as={Link} to="/all-collections" onClick={handleNavLinkClick}>Collections</Nav.Link>
                  <Nav.Link href="#action/3.3" onClick={handleNavLinkClick}>Settings</Nav.Link>
                  
                  <Nav.Link onClick={handleLogout} className='logout-item'>Logout</Nav.Link>
                </>
              ) : (
                <NavDropdown title={`Hello ${userEmail}`} id="basic-nav-dropdown" alignRight="true">
                  <NavDropdown.Item as={Link} to="/my-profile" onClick={handleNavLinkClick}>Your Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/all-collections" onClick={handleNavLinkClick}>Collections</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" onClick={handleNavLinkClick}>Settings</NavDropdown.Item>
                  <NavDropdown.Divider style={{ margin: 0 }} />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default NavBar;
