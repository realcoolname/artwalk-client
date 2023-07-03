import React from "react";
import { Button } from 'react-bootstrap';


function EventCard(props) {
  const { event } = props;



  // Convert the date string to a JavaScript Date object
  const eventDate = new Date(event.date);

  // Format the date with specific options
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = eventDate.toLocaleDateString(undefined, options);

  return (
    <div className='event-card'>
      <h1>IMAGE OF THE EVENT</h1> <hr/>
      <h2>{event.name}</h2>
      <p>Curated by: {event.curator}</p>
      <p>Venue: {event.venue}</p>
      <p>{formattedDate}</p>
      <p>{event.discipline}</p>
      <p>{event.description}</p>
      <Button className='btn-color'>Delete</Button> <br/>
      <Button className='btn-color'>Update</Button>
      
    </div>
  );
}

export default EventCard;
