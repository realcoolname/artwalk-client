import React, { useContext, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal.js";
import LogInModal from "./LogInModal.js";
import { AuthContext } from "../context/auth.context.js";

function NavBar( { isLoggedIn, handleLogOut, handleLogIn } ) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const { logOutUser } = useContext(AuthContext)

  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleOpenLogInModal = () => {
    setShowLogInModal(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUpModal(false);
  };

  const handleLogInSuccess = () => {
    setShowLogInModal(false);
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
            
          {!isLoggedIn && (
            <>
              <Nav.Link
                onClick={handleOpenLogInModal}
                className="nav-link"
              >
                Log In
              </Nav.Link>
              <Nav.Link
                onClick={handleOpenSignUpModal}
                className="nav-link"
              >
                Sign Up
              </Nav.Link>
            </>
          )}
          {isLoggedIn && (
            <Nav.Link onClick={logOutUser} className="nav-link">
              Log Out
            </Nav.Link>
          )}

        </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLogInModal && (
        <LogInModal handleClose={() => setShowLogInModal(false)} 
        handleLogInSuccess={handleLogInSuccess} />
      )}
      {showSignUpModal && (
        <SignUpModal handleClose={() => setShowSignUpModal(false)} 
        handleSignUpSuccess={handleSignUpSuccess} handleLogIn={handleLogIn} />
      )}
    </>
  );
}

export default NavBar;
