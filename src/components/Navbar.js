import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";

function NavBar() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Navbar.Brand style={{ marginLeft: "1em"}} as={Link} to="/">
          ARTWALK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/venues">
              Venues
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Log In
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleOpenSignUpModal}>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showSignUpModal && <SignUpModal handleClose={() => setShowSignUpModal(false)} />}
    </>
  );
}

export default NavBar;
