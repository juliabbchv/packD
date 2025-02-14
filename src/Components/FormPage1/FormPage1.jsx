import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoadScript } from "@react-google-maps/api";
import "./FormPage1.scss";
import Select from "react-select";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries = ["places"];

export default function FormPage1({ handleFormSubmit, setFormData }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [address, setAddress] = useState("");
  const inputRef = useRef(null);

  const [selectedTripOption, setSelectedTripOption] = useState(null);
  const [selectedIdentityOption, setSelectedIdentityOption] = useState(null);

  const tripOptions = [
    { value: "business", label: "Business" },
    { value: "pleasure", label: "Pleasure" },
  ];

  const identityOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "nonbinary", label: "Non-binary" },
  ];

  const selectTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "$muted-sage",
      primary: "#abb799",
    },
  });

  const onLoadAutocomplete = () => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setAddress(place.formatted_address);
          setFormData((prev) => ({
            ...prev,
            destination: place.formatted_address,
          }));
        }
      });
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        onLoad={onLoadAutocomplete}
        version="beta"
        loadingElement={<div />}
      />
      <div className="input-wrapper">
        <input
          className="form__input"
          ref={inputRef}
          type="text"
          placeholder="Enter your destination *"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <DatePicker
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
        <Select
          className="form-select"
          classNamePrefix="form-select"
          options={tripOptions}
          value={selectedTripOption}
          onChange={(selectedOption) => {
            setSelectedTripOption(selectedOption);
            setFormData((prev) => ({
              ...prev,
              travelPurpose: selectedOption.value,
            }));
          }}
          placeholder={"Travel purpose"}
          theme={selectTheme}
        ></Select>

        <Select
          className="form-select"
          classNamePrefix="form-select"
          options={identityOptions}
          value={selectedIdentityOption}
          onChange={(selectedOption) => {
            setSelectedIdentityOption(selectedOption);
            setFormData((prev) => ({
              ...prev,
              travellers: selectedOption.value,
            }));
          }}
          placeholder={"Do you identify as"}
          theme={selectTheme}
        ></Select>
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
