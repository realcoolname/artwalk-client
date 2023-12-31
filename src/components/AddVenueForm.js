import { useState, useContext } from "react";
import { Button, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

const AddVenueForm = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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
  const [imageUrl, setImageUrl] = useState("");

  const [formError, setFormError] = useState(""); // State variable for form error message
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State variable for success toast visibility

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (
      !imageUrl ||
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
      imageUrl: imageUrl,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/venues`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
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
        setImageUrl("");
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
      {isLoggedIn ? (
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
            className={`accordion-collapse collapse ${
              isExpanded ? "show" : ""
            }`}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <form onSubmit={handleSubmit} className="add-event-form">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="add-forms-input-field"
              />

              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="add-forms-input-field"
              />

              <label>Number:</label>
              <input
                type="number"
                name="number"
                value={address.number}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
                className="add-forms-input-field"
              />

              <label>Zip:</label>
              <input
                type="number"
                name="zip"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
                className="add-forms-input-field"
              />

              <label>City:</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="add-forms-input-field"
              />

              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                className="add-forms-input-field"
              />

              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-forms-input-field"
              />

              <label>Website:</label>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="add-forms-input-field"
                style={{ marginBottom: "1em" }}
              />
              <input
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />

              {formError && <p className="error-message">{formError}</p>}

              <button type="submit" className="btn-color">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="not-logged-in-text">Please log in to add a Venue!</p>
      )}

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
