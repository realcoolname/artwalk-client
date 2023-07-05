import { useState, useEffect } from "react";
import axios from "axios";
import VenueCard from "../components/VenueCard";
import AddVenueForm from "../components/AddVenueForm";

function VenuesListPage(props) {
  const [venues, setVenues] = useState([]);

  const getAllVenues = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/venues`)
      .then((response) => setVenues(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVenues();
  }, []);

  return (
    <div>
      <AddVenueForm refreshVenues={getAllVenues} />
      {venues.map((venue) => (
        <VenueCard key={venue._id} venue={venue} />

      ))}
    </div>
  );
}

export default VenuesListPage;
