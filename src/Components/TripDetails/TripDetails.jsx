import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.scss";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState("");
  const [itemDetails, setItemDetails] = useState("");

  console.log(tripDetails);

  const { id } = useParams();

  const fetchTripDetails = async () => {
    try {
      const getTripDetails = await axios.get(
        `http://localhost:8080/trips/${id}`
      );
      setTripDetails(getTripDetails.data[0]);

      console.log("Success");
    } catch (err) {
      console.error("Error fetching trip details", err);
    }
  };

  const fetchItems = async () => {
    try {
      const getTripDetails = await axios.get(
        `http://localhost:8080/trips/${id}/items`
      );

      setItemDetails(getTripDetails.data[0]);
      console.log("Success");
    } catch (err) {
      console.error("Error fetching trip details", err);
    }
  };

  useEffect(() => {
    fetchTripDetails();
    fetchItems();
  }, []);
  return (
    <section className="trip-list">
      <div>
        <h1 className="trip-list__title">{tripDetails.trip_name}</h1>
        <div className="divider-line--trip"></div>
      </div>
      <ul className="trip-tags">
        {tripDetails.activities &&
          tripDetails.activities.split(",").map((tag, index) => (
            <li className="trip-tags__item" key={index}>
              {tag}
            </li>
          ))}
      </ul>
    </section>
  );
}
