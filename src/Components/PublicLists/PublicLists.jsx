import React from "react";
import { useState, useRef, useEffect } from "react";
import "./PublicLists.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import rightArrow from "../../Assets/Images/right-arrow.svg";
import fetchCityImage from "../../Services/googlePlacesPhotosApi";

import {
  loadGoogleMapsAPI,
  initializeAutocomplete,
} from "../../Services/googleMapApi.js";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export default function PublicLists() {
  const [address, setAddress] = useState("");
  const inputRef = useRef(null);
  const [publicLists, setPublicLists] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [cityImages, setCityImages] = useState({});

  useEffect(() => {
    loadGoogleMapsAPI(apiKey, () => {
      initializeAutocomplete(inputRef, setAddress);
    });
  }, []);

  useEffect(() => {
    async function generateUserLists() {
      try {
        const response = await axios.get("http://localhost:8080/trips");
        setPublicLists(response.data);

        const images = {};
        for (const list of response.data) {
          if (list.destination) {
            const imageUrl = await fetchCityImage(list.destination);
            images[list.id] = imageUrl;
          }
        }
        setCityImages(images);
      } catch (err) {
        console.log("Error fetching trips", err);
      }
    }

    generateUserLists();
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
          <select
            id="activity"
            className="form__input filters__input"
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
            }}
          >
            <option value="">Choose an activity</option>
            <option value="hiking">Hiking</option>
            <option value="scuba-diving">Camping</option>
            <option value="shopping">Music Festival</option>
            <option value="sightseeing">Sightseeing</option>
            <option value="camping">Backpacking</option>
          </select>
        </div>
      </div>
      <section className="user-lists">
        <h2 className="user-lists__title">Browse public lists</h2>
        <article className="user-lists__main-content">
          <ul className="user-list-cards ">
            {publicLists &&
              publicLists
                .filter((list) => list.user_id !== 1 && list.isPublic === 1)
                .map((list) => (
                  <li
                    className="trip-card"
                    key={list.id}
                    style={{
                      backgroundImage: cityImages[list.id]
                        ? `url(${cityImages[list.id]})`
                        : "",
                    }}
                  >
                    <div className="trip-card__top">
                      <Link to={`/dashboard/public-trips/${list.id}`}>
                        <div className="trip-card__title-wrapper trip-card__title-wrapper--public">
                          <div className="trip-card__tile-group">
                            <h3 className="trip-card__title">
                              {list.trip_name}
                            </h3>

                            <img
                              className="action-icon"
                              src={rightArrow}
                              alt=""
                            />
                          </div>
                          <p className="trip-card__title"> Created by: </p>
                        </div>
                      </Link>
                    </div>
                    <ul className="trip-card__tag-list">
                      <li className="trip-card__tag-list-item">
                        {list.destination}
                      </li>
                      {list.activities.split(",").map((activity, index) => (
                        <li className="trip-card__tag-list-item" key={index}>
                          {activity.toLowerCase()}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
