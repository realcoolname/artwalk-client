import React from "react";
import service from "../api/service";


function VenueCard(props) {
  const { venue } = props;

  return (
    <div className='event-card'>
      <img src={venue.imageUrl} alt="venue" width="200" />
      <h2>{venue.name}</h2>
      <p>{venue.address.street} {venue.address.number}, {venue.address.zip}</p>
      <p>{venue.address.city}, {venue.address.country}</p>
      <p>{venue.description}</p>
      <p>{venue.website}</p>
      
    </div>
  );
}


export default VenueCard;