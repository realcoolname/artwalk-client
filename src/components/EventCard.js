import React from "react";
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function EventCard(props) {
  const { event } = props;
  const {eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // DELETE EVENT
  const deleteEvent = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/events/${event._id}`)
      .then(() => {
        props.refreshEvents()
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
      <br/>
      <Button className='btn-color' onClick={deleteEvent}>Delete</Button> 
      <br/>
      <Button className='btn-color'>Update</Button>
      
    </div>
  );
}

export default EventCard;
