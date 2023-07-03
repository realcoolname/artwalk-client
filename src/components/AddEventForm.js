import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddEventForm = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [name, setName] = useState("");
  const [curator, setCurator] = useState("");
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [date, setDate] = useState(null);
  const [discipline, setDiscipline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      curator,
      venues: [selectedVenue],
      date,
      discipline,
      description,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/events`, requestBody)
      .then((response) => {
        // Reset the state
        setName("");
        setCurator("");
        setSelectedVenue(""); // Clear selected venue
        setDate(null); // Clear date
        setDiscipline("");
        setDescription("");
        props.refreshEvents();
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
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
            type="button"
            onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <form onSubmit={handleSubmit}>
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
            <select value={selectedVenue} onChange={handleVenueChange}>
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue.name}>
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

<button type="submit" className="btn-color">
  Submit
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
