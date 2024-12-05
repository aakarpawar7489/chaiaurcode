import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/listings');
        setListings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {listings.map((listing, index) => (
        <div key={index}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>{listing.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Listings;
