import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";

function UpdateEventModal({ event, onClose, refreshEvents }) {
  const [name, setName] = useState(event.name || "");
  const [curator, setCurator] = useState(event.curator || "");
  const [selectedVenue, setSelectedVenue] = useState(event.venue || null);
  const [date, setDate] = useState(event.date ? event.date.split("T")[0] : "");
  const [discipline, setDiscipline] = useState(event.discipline || "");
  const [description, setDescription] = useState(event.description || "");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/venues`)
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const requestBody = {
      name,
      curator,
      venue: selectedVenue._id,
      date,
      discipline,
      description,
    };
  
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/events/${event._id}`, requestBody)
      .then((response) => {
        refreshEvents();
        onClose();
      })
      .catch((error) => console.log(error));
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal show={true} onHide={closeModal} className="modal-container">
      <Modal.Header closeButton>
        <Modal.Title>Update Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="update-event-container">

        <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Curator:</label>
          <input
            type="text"
            value={curator}
            onChange={(e) => setCurator(e.target.value)}
          />

          <label>Venue:</label>
          <Select
            value={selectedVenue}
            onChange={(value) => setSelectedVenue(value)}
            options={venues}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
          />

          <label>Discipline:</label>
          <input
            type="text"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="primary" style={{ marginTop: "1em", marginBottom: "0.5em" }}>
            Save Changes
          </Button>
          
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateEventModal;
