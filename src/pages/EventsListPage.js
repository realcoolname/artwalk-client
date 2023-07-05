import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";
import axios from "axios";
import AddEventForm from "../components/AddEventForm";
import UpdateEventModal from "../components/UpdateEventModal";

function EventsListPage(props) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateButtonClick = (event) => {
    setSelectedEvent(event);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedEvent(null);
    setShowUpdateModal(false);
  };

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
      <AddEventForm refreshEvents={getAllEvents} />
      {events.length === 0 ? (
        <p>Currently, there are no events to show.</p>
      ) : (
        events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            refreshEvents={getAllEvents}
            handleUpdateButtonClick={handleUpdateButtonClick}
          />
        ))
      )}
      {showUpdateModal && (
        <UpdateEventModal
          event={selectedEvent}
          onClose={handleCloseUpdateModal}
          refreshEvents={getAllEvents}
        />
      )}
    </div>
  );
}

export default EventsListPage;







