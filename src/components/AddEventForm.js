import { useState, useEffect, useContext } from "react";
import { Button, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const AddEventForm = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [curator, setCurator] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [date, setDate] = useState(null);
  const [discipline, setDiscipline] = useState("");
  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState(""); // State variable for form error message
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State variable for success toast visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (
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
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Curator:</label>
              <textarea
                type="text"
                name="curator"
                value={curator}
                onChange={(e) => setCurator(e.target.value)}
              />
              <select
                value={selectedVenue}
                onChange={handleVenueChange}
                className="select-venue-text"
              >
                <option value="">Select Venue</option>
                {venues.map((venue, index) => (
                  <option key={index} value={venue._id}>
                    {venue.name}
                  </option>
                ))}
              </select>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                placeholderText="Date"
              />
              <label>Discipline:</label>
              <textarea
                type="text"
                name="discipline"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
              />

              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {formError && <p className="error-message">{formError}</p>}

              <button type="submit" className="btn-color">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <p className="not-logged-in-text">Please log in to add Events!</p>
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
