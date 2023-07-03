import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import AddEventForm from "../components/AddEventForm"

function EventsListPage(props) {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };
  

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
      <AddEventForm refreshEvents={getAllEvents}/>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventsListPage;
