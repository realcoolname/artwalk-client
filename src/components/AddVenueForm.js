import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddVenueForm = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState({
    street: "",
    number: "",
    zip: "",
    city: "",
    country: "",
  });
  const [website, setWebsite] = useState("");

  const [formError, setFormError] = useState(""); // State variable for form error message
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State variable for success toast visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (
      !name ||
      !address.street ||
      !address.number ||
      !address.zip ||
      !address.city ||
      !address.country ||
      !description ||
      !website
    ) {
      setFormError("All fields must be completed!");
      return;
    }

    const requestBody = {
      name,
      address,
      description,
      website,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/venues`, requestBody)
      .then((response) => {
        // Reset the state
        setName("");
        setAddress({
          street: "",
          number: "",
          zip: "",
          city: "",
          country: "",
        });
        setDescription("");
        setWebsite("");
        setFormError("");
        setShowSuccessToast(true);
        props.refreshVenues();

        setIsExpanded(false);
      })
      .catch((error) => console.log(error));
  };

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion accordion-container" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button ${
              isExpanded ? "" : "collapsed"
            } accordion-width`}
            type="button"
            onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Venue
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <form onSubmit={handleSubmit} className="add-event-form">
            {/* <input type="text" placeholder="Image" /> */}
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Street:</label>
            <textarea
              type="text"
              name="street"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />

            <label>Number:</label>
            <textarea
              type="number"
              name="number"
              value={address.number}
              onChange={(e) =>
                setAddress({ ...address, number: e.target.value })
              }
            />

            <label>Zip:</label>
            <textarea
              type="number"
              name="zip"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />

            <label>City:</label>
            <textarea
              type="text"
              name="city"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />

            <label>Country:</label>
            <textarea
              type="text"
              name="country"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />

            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Website:</label>
            <textarea
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            {formError && <p className="error-message">{formError}</p>}

            <button type="submit" className="btn-color">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        delay={3000}
        autohide
        className="toast-container"
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Venue successfully created!</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddVenueForm;
