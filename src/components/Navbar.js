import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal.js";
import LogInModal from "./LogInModal.js";

function NavBar() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenSignUpModal = () => {
    setShowSignUpModal((prevState) => !prevState);
  };

  const handleOpenLogInModal = () => {
    setShowLogInModal((prevState) => !prevState);
  };

  const handleLogInAfterSignUp = () => {
    setShowSignUpModal(false);
    setShowLogInModal(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Navbar.Brand style={{ marginLeft: "1em" }} as={Link} to="/">
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
          </Nav>

          <Nav className="navbar-nav ms-auto nav-margin-right">
            <Nav.Link onClick={handleOpenLogInModal} className="nav-link">
              Log In
            </Nav.Link>
            <Nav.Link onClick={handleOpenSignUpModal} className="nav-link">
              Sign Up
            </Nav.Link>
            <Nav.Link onClick={handleLogOut} className="nav-link">
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLogInModal && (
        <LogInModal handleClose={() => setShowLogInModal(false)} />
      )}
      {showSignUpModal && (
        <SignUpModal
          handleClose={() => setShowSignUpModal(false)}
          handleLogInAfterSignUp={handleLogInAfterSignUp}
        />
      )}
    </>
  );
}

export default NavBar;
