import React from "react";


function VenueCard(props) {
  const { venue } = props;

  return (
    <div className='event-card'>
      <h1>IMAGE OF THE VENUE</h1>
      <h2>{venue.name}</h2>
      <p>{venue.address.street} {venue.address.number}, {venue.address.zip}</p>
      <p>{venue.address.city}, {venue.address.country}</p>
      <p>{venue.description}</p>
      <p>{venue.website}</p>
      
    </div>
  );
}


export default VenueCard;