import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./TripDetails.scss";
import ListSection from "../ListSection/ListSection";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const togglePublic = async () => {
    try {
      setIsPublic((prev) => {
        const newValue = !prev;
        updateTripDetails({ isPublic: newValue ? 1 : 0 });
        return newValue;
      });
    } catch (err) {
      console.error("Error toggling public status:", err);
    }
  };

  const handleCheckboxChange = (itemId) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };
    setCheckedItems(newCheckedItems);
    localStorage.setItem("checkedItems", JSON.stringify(newCheckedItems));
  };

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

  const deleteTripDetails = async () => {
    try {
      await axios.delete(`http://localhost:8080/trips/${id}`);
      console.log("Trip deleted successfully");

      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting trip", err);
    }
  };

  const fetchItems = async () => {
    try {
      const getItemsDetails = await axios.get(
        `http://localhost:8080/trips/${id}/items`
      );
      setItemDetails(getItemsDetails.data);
      console.log("Success");
    } catch (err) {
      console.error("Error fetching trip details", err);
    }
  };

  useEffect(() => {
    fetchTripDetails();
    fetchItems();
  }, []);

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem("checkedItems");
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, []);

  const updateTripDetails = async (updatedTripData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/trips/${id}/`,
        updatedTripData
      );
      console.log("Trip details updated:", response.data);

      setTripDetails(response.data);
    } catch (err) {
      console.error("Error updating trip details:", err);
    }
  };

  const handleSaveTripDetails = () => {
    const updatedTripData = {
      trip_name: tripDetails.trip_name,
      isPublic: tripDetails.isPublic,
      isSaved: 1,
      id: tripDetails.id,
    };

    updateTripDetails(updatedTripData);
    navigate(`/dashboard/trips/${updatedTripData.id}`);
  };

  const normalizeCategory = (category) =>
    category.toLowerCase().replace(/[\s-]+/g, "");

  const filterItemsByCategory = (category) => {
    const normalizedCategory = normalizeCategory(category);
    if (Array.isArray(itemDetails)) {
      return itemDetails.filter(
        (item) =>
          item.category &&
          normalizeCategory(item.category) === normalizedCategory
      );
    }
    return [];
  };

  return (
    <section className="trip-list">
      <div>
        <h1 className="trip-list__title">{tripDetails.trip_name}</h1>
        <div className="divider-line--trip"></div>
      </div>
      <ul className="trip-tags">
        {tripDetails.activities &&
          tripDetails.activities.split(",").map((tag, index) => (
            <li className="trip-tags__item " key={index}>
              {tag.toLowerCase()}
            </li>
          ))}
      </ul>
      {location.pathname.includes("/dashboard/trips") ? (
        <div className="switchwrap">
          <label className="switch">
            <input
              type="checkbox"
              checked={tripDetails.isPublic === 1}
              onChange={togglePublic}
            />
            <span className="slider round"></span>
          </label>
          <span>{tripDetails.isPublic === 1 ? "Public" : "Private"}</span>{" "}
        </div>
      ) : (
        ""
      )}
      <h2>
        {location.pathname.includes("/dashboard/trips")
          ? "Your Packing List:"
          : "Packing List:"}
      </h2>
      <div className="list-details">
        {[
          "before-you-go",
          "documents",
          "clothes",
          "activity-items",
          "tech",
          "toiletries & health",
          "misc",
          "food",
        ].map((category) => (
          <ListSection
            key={category}
            category={
              category.charAt(0).toUpperCase() +
              category.slice(1).replace(/-/g, " ")
            }
            items={
              category === "toiletries & health"
                ? [
                    ...filterItemsByCategory("toiletries"),
                    ...filterItemsByCategory("health"),
                  ]
                : filterItemsByCategory(category)
            }
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            setItemDetails={setItemDetails}
            fetchItems={fetchItems}
          />
        ))}
      </div>
      <div>
        {location.pathname.includes("/dashboard/public-trips") ? (
          <button
            className="form__btn form__btn--next"
            onClick={handleSaveTripDetails}
          >
            Save Trip
          </button>
        ) : (
          <button
            className="delete-btn form__btn form__btn--back"
            onClick={() => setShowModal(true)}
          >
            Delete List
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <p className="modal__title modal__title--bold">
              Are you sure you want to delete this list?
            </p>
            <div className="modal__buttons">
              <button
                onClick={deleteTripDetails}
                className="modal__button modal__button--confirm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="modal__button modal__button--cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
