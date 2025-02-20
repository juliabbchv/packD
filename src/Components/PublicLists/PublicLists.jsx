import React from "react";
import { useState, useRef, useEffect } from "react";
import "./PublicLists.scss";

import {
  loadGoogleMapsAPI,
  initializeAutocomplete,
} from "../../Services/googleMapApi.js";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export default function PublicLists() {
  const [address, setAddress] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsAPI(apiKey, () => {
      initializeAutocomplete(inputRef, setAddress);
    });
  }, []);

  return (
    <section className="dashboard public-trips">
      <div className="dashboard__greeting">
        <h1>Explore what other travellers bring on their trips</h1>
      </div>
      <div className="divider-line"></div>
      <div className="filters">
        <p className="filters__text">Filter by:</p>
        <div className="filters-inputs">
          <label htmlFor="destination" className="filters__label">
            Destination
          </label>
          <input
            id="destination"
            className="form__input filters__input"
            ref={inputRef}
            type="text"
            placeholder="City & country"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="filters-inputs">
          <label htmlFor="activity" className="filters__label">
            Activity
          </label>
          <select id="activity" className="form__input filters__input">
            <option selected disabled value="">
              Choose an activity
            </option>
            <option value="hiking">Hiking</option>
            <option value="scuba-diving">Camping</option>
            <option value="shopping">Music Festival</option>
            <option value="sightseeing">Sightseeing</option>
            <option value="camping">Backpacking</option>
          </select>
        </div>
      </div>
    </section>
  );
}
