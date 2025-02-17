import React, { useState } from "react";

export default function FormPage3({ handleFormSubmit, setFormData }) {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedActivities((prev) =>
      checked ? [...prev, value] : prev.filter((activity) => activity !== value)
    );
    setFormData((prev) => ({
      ...prev,
      activities: checked
        ? [...(prev.activities || []), value]
        : (prev.activities || []).filter((activity) => activity !== value),
    }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <section>
        <div className="inputs-container">
          <p className="input-title">What are you planning to do?</p>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="hiking"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="hiking">Hiking</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="winterSports"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="winterSports">Winter Sports</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="campingActivity"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="camping">Camping</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="beachAndWaterActivities"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="beachAndWaterActivities">Beach</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="surfing"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="beachAndWaterActivities">Surfing</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="diningAndGoingOut"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="diningAndGoingOut">Dining/Going Out</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="fitnessAndSports"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="fitnessAndSports">Fitness and sports</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="musicFestival"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="festival">Music Festival</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="backpacking"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="backpacking">Backpacking</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              value="cruiseship"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="cruiseship">Cruiseship</label>
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
