import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import LogInModal from "./LogInModal";

function SignUpModal({ handleClose, showSignUpModal, openLogin }) {
  // const [showSignUpModal, setShowSignupModal] = useState(true);
  // const [showLoginModal, setShowLoginModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authenticateUser, storeToken } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  useEffect(() => {
    // setShowSignupModal(true);
  }, []);

  const handleModalClose = () => {
    //setShowSignupModal(false);
    handleClose();
  };

  const handleLoginLinkClick = () => {
    handleClose()
    openLogin()
    //setShowSignupModal(false);
    // setShowLoginModal(true);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        
        setEmail("");
        setPassword("");
        setName("");
        handleClose();
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <Modal
        show={showSignUpModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
        className="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="SignupPage">
            <form
              onSubmit={handleSignupSubmit}
              className="signup-form-container"
            >
              <label className="label-text">Full Name:</label>
              <input
                className="input-field"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                autoComplete="name"
              />

              <label className="label-text">Email:</label>
              <input
                className="input-field"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                autoComplete="email"
              />

              <label className="label-text">Password:</label>
              <input
                className="input-field"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                autoComplete="password"
              />

              <div className="sign-up-button-group">
                <Button
                  variant="secondary"
                  onClick={handleModalClose}
                  className="close-btn"
                >
                  Close
                </Button>
                <Button variant="primary" type="submit" className="sign-up-btn">
                  Sign Up
                </Button>
              </div>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p className="have-account">
              Already have an account? 👉
              <Link onClick={handleLoginLinkClick}>
                Login
              </Link>
            </p>
          </div>

         {/*  {showLoginModal && (
            <LogInModal
              handleClose={() => {
                // setShowLoginModal(false);
                handleModalClose();
              }}
              handleLogInSuccess={handleSignUpSuccess}
            />
          )} */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUpModal;
