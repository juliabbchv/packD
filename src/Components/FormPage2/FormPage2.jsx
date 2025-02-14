import React, { useState, useRef } from "react";
import "./FormPage2.scss";

export default function FormPage2({ setFormData, handleFormSubmit }) {
  const handleChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [value]: checked };
      if (!checked) {
        updatedData[value] = false;
      }
      return updatedData;
    });
  };

  return (
    <>
      <section>
        <div className="inputs-container">
          <p className="input-title">Where are you staying?</p>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="airbnb" onChange={handleChange} />
            <label htmlFor="airbnb">Airbnb</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="hotelORhostel"
              onChange={handleChange}
            />
            <label htmlFor="hotelORhostel">Hotel/Hostel</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="camping" onChange={handleChange} />
            <label htmlFor="camping">Camping</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="cruiseship" onChange={handleChange} />
            <label htmlFor="cruiseship">Cruiseship</label>
          </div>
        </div>

        <div className="inputs-container">
          <p className="input-title">How are you getting there?</p>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="plane" onChange={handleChange} />
            <label htmlFor="plane">Plane</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="car" onChange={handleChange} />
            <label htmlFor="">Car</label>
          </div>
          <div className="checkbox-wrapper">
            <input type="checkbox" value="ship" onChange={handleChange} />
            <label htmlFor="ship">Ship</label>
          </div>
        </div>
      </section>
      <div className="form__btnwrap">
        <button
          onClick={(e) => handleFormSubmit(e, "back")}
          className="form__btn form__btn--back"
        >
          Back
        </button>
        <button
          className="form__btn form__btn--next"
          onClick={(e) => handleFormSubmit(e, "next")}
          action="submit"
        >
          Next
        </button>
      </div>
    </>
  );
}
