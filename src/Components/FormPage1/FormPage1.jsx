import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormPage1.scss";

import {
  loadGoogleMapsAPI,
  initializeAutocomplete,
} from "../../Services/googleMapApi.js";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export default function FormPage1({ handleFormSubmit, setFormData }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [address, setAddress] = useState("");
  const inputRef = useRef(null);

  const [selectedTripOption, setSelectedTripOption] = useState("");
  const [selectedIdentityOption, setSelectedIdentityOption] = useState("");

  useEffect(() => {
    loadGoogleMapsAPI(apiKey, () => {
      initializeAutocomplete(inputRef, setAddress, setFormData);
    });
  }, [setFormData]);

  return (
    <>
      <div className="input-wrapper">
        <label htmlFor="destination">Tell us where you're going</label>
        <input
          id="destination"
          className="form__input"
          ref={inputRef}
          type="text"
          placeholder="Enter your destination *"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <label htmlFor="datepicker">Select travel dates</label>
        <DatePicker
          id="datepicker"
          className="form__input"
          withPortal
          selected={startDate}
          onChange={(update) => {
            setDateRange(update);
            const formattedDates = update
              ? update.map((date) =>
                  date ? date.toLocaleDateString("en-US") : ""
                )
              : ["", ""];

            setFormData((prev) => ({
              ...prev,
              dates: formattedDates,
            }));
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="MM-dd-yyyy"
          placeholderText="Select travel dates"
          isClearable={true}
        />
        <label htmlFor="trip-purpose">What's the purpose of your trip?</label>
        <select
          id="trip-purpose"
          className="form-select"
          value={selectedTripOption}
          onChange={(e) => {
            setSelectedTripOption(e.target.value);
            setFormData((prev) => ({
              ...prev,
              travelPurpose: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            Travel purpose
          </option>
          <option value="business" placeholder="Travel purpose">
            Business
          </option>
          <option value="leisure" placeholder="Travel purpose">
            Leisure
          </option>
        </select>
        <label htmlFor="gender">Do you identify as?</label>
        <select
          id="gender"
          className="form-select"
          value={selectedIdentityOption}
          onChange={(e) => {
            setSelectedIdentityOption(e.target.value);
            setFormData((prev) => ({
              ...prev,
              travellers: e.target.value,
            }));
          }}
        >
          <option className="form-select--disabled" value="">
            Your gender
          </option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
      </div>

      <button
        type="submit"
        className="form__btn form__btn--next"
        onClick={(e) => handleFormSubmit(e, "next")}
        action="submit"
      >
        Next
      </button>
    </>
  );
}
