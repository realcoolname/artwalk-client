import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";



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



  return event && (
    <div className='event-card'>
      <h1>IMAGE OF THE EVENT</h1> <hr/>
      <h2>{event.name}</h2>
      <p>Curated by: {event.curator}</p>
      <p>Venue: {event.venue?.name}</p>
      <p>{formattedDate}</p>
      <p>{event.discipline}</p>
      <p>{event.description}</p>
      
      { isLoggedIn && isEventOwner && (
        <div>
      <Button className='btn-color' onClick={deleteEvent}>Delete</Button> <br/>
      <Button className="btn-color" onClick={handleUpdate}>Update</Button>
      </div>
      )}
    </div>
  );
}

export default EventCard;
