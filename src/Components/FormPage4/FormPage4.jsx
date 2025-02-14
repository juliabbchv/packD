import { useEffect, useState } from "react";
import axios from "axios";

export default function FormPage4({ listDetails }) {
  console.log(listDetails);
  const handleSave = async () => {
    try {
      const sentObject = {
        user_id: 1,
        destination: listDetails.packingList.trip.destination,
        trip_purpose: listDetails.packingList.trip.trip_purpose,
        activities: listDetails.packingList.trip.activities,
        trip_name: "New Name",
        isPublic: 0,
        isSaved: 0,
      };

      const addTripDetails = await axios.post(
        "http://localhost:8080/trips",
        sentObject
      );

      console.log("Trip added");
    } catch (err) {
      console.error("Error creating new trip", err);
    }
  };

  return (
    <div>
      <h3>Your Packing List:</h3>
      <pre>{JSON.stringify(listDetails, null, 2)}</pre>
      <button onClick={handleSave}>Save list</button>
    </div>
  );
}
