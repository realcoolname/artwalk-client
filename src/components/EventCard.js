import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";



function EventCard({ event, refreshEvents, handleUpdateButtonClick }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

  const isEventOwner = event && user && event.owner === user._id;

  console.log(event);
  

  // DELETE EVENT
  const deleteEvent = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/events/${event._id}`)
      .then(() => {
        refreshEvents();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => {
        setEvents(response.data); // Update the state with the fetched events
      })
      .catch((err) => console.log(err));
  }, [eventId]);

  const handleUpdate = () => {
    handleUpdateButtonClick(event);
  };

  // Convert the date string to a JavaScript Date object
  const eventDate = new Date(event.date);

  // Format the date with specific options
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = eventDate.toLocaleDateString(undefined, options);


  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card card-container">
      <div className="card-img-container">
        <img
          src={event.imageUrl}
          className="card-img-top"
          alt="event"
          
        />
        </div>
        <div className="card-body event-card-body">
          <h2 className="card-title" >{event.name}</h2>
          <p className="card-text">Curated by: {event.curator}</p>
          <p className="card-text">Venue: {event.venue?.name}</p>
          <p className="card-text">{formattedDate}</p>
          <p className="card-text">{event.discipline}</p>
          <p className="card-text">{event.description}</p>
          {isLoggedIn && isEventOwner && (
            <div className="d-flex event-card-buttons">
              <Button className="btn btn-primary update-btn" onClick={handleUpdate}>
                Update
              </Button>
              <Button className="btn btn-danger delete-btn" onClick={deleteEvent}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
