import { useState, useEffect, useContext } from "react";
import { Button, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
// import the service file since we need it to send/get the data to/from the server
import service from "../api/service";

const AddEventForm = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [curator, setCurator] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [date, setDate] = useState(null);
  const [discipline, setDiscipline] = useState("");
  const [description, setDescription] = useState("");

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
      !curator ||
      !selectedVenue ||
      !date ||
      !discipline ||
      !description
    ) {
      setFormError("All fields must be completed!");
      return;
    }

    const requestBody = {
      imageUrl,
      name,
      curator,
      venue: selectedVenue,
      date,
      discipline,
      description,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/events`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // Reset the state
        setImageUrl("");
        setName("");
        setCurator("");
        setSelectedVenue(""); // Clear selected venue
        setDate(null); // Clear date
        setDiscipline("");
        setDescription("");
        setFormError("");
        setShowSuccessToast(true);
        props.refreshEvents();

        setIsExpanded(false);
      })
      .catch((error) => console.log(error));
  };

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
  };

  useEffect(() => {
    // Fetch venues from the database
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/venues`)
      .then((response) => setVenues(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="accordion accordion-container" id="accordionExample">
      {isLoggedIn && (
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={`accordion-button ${
                isExpanded ? "" : "collapsed"
              } accordion-width`}
              type="button"
              onClick={handleButtonClick}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Event
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
              {/* <input type="text" placeholder="Image" /> */}
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                placeholderText="Date"
                style={{ marginTop: "1em"}}
              />

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="add-forms-input-field"
              />

              <label>Curator:</label>
              <textarea
                type="text"
                name="curator"
                value={curator}
                onChange={(e) => setCurator(e.target.value)}
                className="add-forms-input-field"
              />
              <select
                value={selectedVenue}
                onChange={handleVenueChange}
                className="select-venue-text add-forms-input-field"
                style={{ marginTop: "1em ", paddingTop: "0.2em", paddingBottom: "0.2em"}}
              >
                <option value="">Select Venue</option>
                {venues.map((venue, index) => (
                  <option key={index} value={venue._id}>
                    {venue.name}
                  </option>
                  
                ))}
              </select>
              
              <label>Discipline:</label>
              <textarea
                type="text"
                name="discipline"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="add-forms-input-field"
              />

              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-forms-input-field"
                style={{marginBottom: "1em"}}
              />

              <input type="file" onChange={(e) => handleFileUpload(e)} />

              {formError && <p className="error-message">{formError}</p>}

              <button type="submit" className="btn-color">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <p className="not-logged-in-text">Please log in to add an Event!</p>
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
        <Toast.Body>Event successfully created!</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddEventForm;
