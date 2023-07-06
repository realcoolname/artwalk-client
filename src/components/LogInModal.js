import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";



function LogInModal({ handleClose, handleLogInSuccess }) {
  const [show, setShow] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleModalClose = () => {
    setShow(false);
    handleClose();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {

        console.log('after login', response.data)

        storeToken(response.data.authToken);
        authenticateUser();
        handleModalClose();
        handleLogInSuccess();
        navigate("/events");
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
      className="modal-container"
    >
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="LoginPage">
          <form onSubmit={handleLoginSubmit} className="login-form-container">
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

            <div className="login-button-group">
              <Button
                variant="secondary"
                onClick={handleModalClose}
                className="close-btn"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="login-btn">
                Log In
              </Button>
            </div>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LogInModal;
