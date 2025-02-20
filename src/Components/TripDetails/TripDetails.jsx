import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.scss";
import ListSection from "../ListSection/ListSection";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const { id } = useParams();
  console.log(itemDetails);

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
      <div className="switchwrap">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round "></span>
        </label>
        <span>Private</span>
      </div>
      <h2>Your Packing List:</h2>
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
          />
        ))}
      </div>
      <button className="form__btn form__btn--back">Delete List</button>
    </section>
  );
}
