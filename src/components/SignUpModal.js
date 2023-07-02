import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignUpModal({ handleClose }) {
  const [show, setShow] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleModalClose = () => {
    setShow(false);
    handleClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, email, password };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        handleModalClose();
        navigate("/events");
    })
    .catch((error) =>{
      setErrorMessage("Sign up failed. Please try again.");
    }
  )};

    return (
      <Modal
        show={show}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="SignupPage">

            <form onSubmit={handleSignupSubmit} class="signup-form-container">

            <label class="label-text">Full Name:</label>
              <input class="input-field"
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />

              <label class="label-text">Email:</label>
              <input class="input-field"
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />

              <label class="label-text">Password:</label>
              <input class="input-field"
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />

              <div class="sign-up-button-group">
              <Button variant="secondary" onClick={handleModalClose} className="close-btn">
                Close
              </Button>
              <Button variant="primary" type="submit" className="sign-up-btn">
                Sign Up
              </Button>
            </div>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p class="have-account">Already have an account? 👉 <Link to={"/"}> Login</Link></p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
