import "./Form.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useState, useEffect } from "react";
import FormPage1 from "../FormPage1/FormPage1";
import FormPage2 from "../FormPage2/FormPage2";
import FormPage3 from "../FormPage3/FormPage3";
import FormPage4 from "../FormPage4/FormPage4";
import axios from "axios";

export default function Form() {
  const [currentPage, setCurrentPage] = useState(1);
  const [packingList, setPackingList] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: null,
    dates: [],
    travelPurpose: null,
    travellers: null,
    airbnb: false,
    hotelORhostel: false,
    cruiseship: false,
    camping: false,
    plane: false,
    car: false,
    ship: false,
    activities: [],
  });
  const pageData = {
    1: 25,
    2: 50,
    3: 75,
    4: 100,
  };

  const completed = pageData[currentPage];

  console.log(formData);

  const isFormValid = () => {
    return formData.destination && formData.destination.trim() !== "";
  };

  useEffect(() => {
    const fetchPackingList = async () => {
      if (currentPage === 4) {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:8080/api/packinglist",
            formData
          );
          console.log("API Response:", response.data);

          if (response.data && typeof response.data === "object") {
            setPackingList(response.data);
          } else {
            console.error("Unexpected API response format:", response.data);
          }
        } catch (error) {
          console.error("Error generating packing list:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPackingList();
  }, [currentPage, formData]);

  const handleFormSubmit = (e, direction) => {
    e.preventDefault();
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "back") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  console.log(currentPage);

  return (
    <>
      <section className="form-wrapper">
        <div className="form-steps">
          <div className={`form-step ${currentPage === 1 ? "" : "hidden"}`}>
            <p className="form-step__item">
              Tell us about you and your destination
            </p>
          </div>
          <div className={`form-step ${currentPage === 2 ? "" : "hidden"}`}>
            <p className="form-step__item">Accommodation & transport</p>
          </div>
          <div className={`form-step ${currentPage === 3 ? "" : "hidden"}`}>
            <p className="form-step__item">Activities</p>
          </div>
          <div className={`form-step ${currentPage === 4 ? "" : "hidden"}`}>
            <p className="form-step__item">Your packing list</p>
          </div>
        </div>
        <div>
          <ProgressBar completed={completed} />
        </div>
        <form className="form" action="" onSubmit={handleFormSubmit}>
          {/* Step 1 */}
          {currentPage === 1 && (
            <FormPage1
              handleFormSubmit={handleFormSubmit}
              setFormData={setFormData}
              isFormValid={() => {
                isFormValid();
              }}
            />
          )}
          {/* Step 2 */}
          {currentPage === 2 && (
            <FormPage2
              setFormData={setFormData}
              handleFormSubmit={handleFormSubmit}
            />
          )}
          {/* Step 3 */}
          {currentPage === 3 && (
            <FormPage3
              setFormData={setFormData}
              formData={formData}
              handleFormSubmit={handleFormSubmit}
            />
          )}
          {/* Step 4 */}
          {currentPage === 4 && (
            <FormPage4
              listDetails={packingList}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </form>
      </section>
    </>
  );
}
