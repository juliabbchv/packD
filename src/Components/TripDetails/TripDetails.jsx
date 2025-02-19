import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.scss";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const { id } = useParams();

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

  const handleItemChange = (itemId, newName) => {
    const updatedItems = itemDetails.map((item) =>
      item.id === itemId ? { ...item, item: newName } : item
    );
    setItemDetails(updatedItems);
  };

  const updateItem = async (tripId, itemId, updatedItemData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/trips/${tripId}/items`, // Backend endpoint
        {
          id: itemId, // Send the item ID
          ...updatedItemData, // Send the updated data
        }
      );
      console.log("Item updated:", response.data);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleSaveChanges = (item) => {
    const updatedItemData = {
      item: item.item,
      link: item.link,
      quantity: item.quantity,
    };

    updateItem(item.trip_id, item.id, updatedItemData);
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
              {tag}
            </li>
          ))}
      </ul>
      <h2>Your Packing List:</h2>
      <div className="list-details">
        <h4 className="list-details__subheader">Before you go:</h4>
        <div className="list-details__items">
          <ul className="item-list">
            {itemDetails &&
              itemDetails.map((item) =>
                item.category.toLowerCase() === "before you go" ||
                item.category.toLowerCase() === "before-you-go" ? (
                  <li className="item-list__group" key={item.id}>
                    <div className="item-list__label checkbox-wrapper">
                      <input
                        checked={checkedItems[item.id] || false}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item.id)}
                        className="item-list__checkbox "
                      />
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) =>
                          handleItemChange(item.id, e.target.value)
                        }
                        className="item-list__name"
                      />
                    </div>
                    {item.link && (
                      <p className="item-list__link item-list__link--transparent">
                        <input
                          type="text"
                          value={item.link}
                          onChange={(e) =>
                            handleLinkChange(item.id, e.target.value)
                          }
                          className="item-list__link-input"
                        />
                      </p>
                    )}
                  </li>
                ) : null
              )}
          </ul>
        </div>
        {/* Documents */}
        <h4 className="list-details__subheader">Documents:</h4>
        <div className="list-details__items">
          <ul className="item-list">
            {itemDetails &&
              itemDetails.map((item) =>
                item.category?.toLowerCase() === "documents" ? (
                  <li className="item-list__group" key={item.id}>
                    <div className="item-list__label checkbox-wrapper">
                      <input type="checkbox" className="item-list__checkbox" />
                      <span className="item-list__name">{item.item}</span>
                    </div>
                  </li>
                ) : null
              )}
          </ul>
        </div>

        {/* Clothes */}
        {itemDetails &&
          itemDetails.some(
            (item) => item.category && item.category.toLowerCase() === "clothes"
          ) && (
            <>
              <h4 className="list-details__subheader">Clothes:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter(
                      (item) => item.category?.toLowerCase() === "clothes"
                    )
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                        {item.quantity && (
                          <p className="item-list__qty"> QTY:{item.quantity}</p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Activity-related items */}
        {itemDetails &&
          itemDetails.some(
            (item) =>
              item.category &&
              (item.category.toLowerCase() === "activity-related items" ||
                item.category.toLowerCase() === "activity-items")
          ) && (
            <>
              <h4 className="list-details__subheader">
                Activity-related items:
              </h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter(
                      (item) =>
                        item.category?.toLowerCase() ===
                          "activity-related items" ||
                        item.category?.toLowerCase() === "activity-items"
                    )
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                        {item.quantity && (
                          <p className="item-list__qty"> QTY:{item.quantity}</p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Tech */}
        {itemDetails &&
          itemDetails.some(
            (item) => item.category && item.category.toLowerCase() === "tech"
          ) && (
            <>
              <h4 className="list-details__subheader">Tech:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter((item) => item.category?.toLowerCase() === "tech")
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Toiletries & Health */}
        {itemDetails &&
          itemDetails.some(
            (item) =>
              (item.category && item.category.toLowerCase() === "toiletries") ||
              item.category.toLowerCase() === "health"
          ) && (
            <>
              <h4 className="list-details__subheader">Toiletries & health:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter(
                      (item) =>
                        item.category?.toLowerCase() === "toiletries" ||
                        item.category?.toLowerCase() === "health"
                    )
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                        {item.quantity && (
                          <p className="item-list__qty"> QTY:{item.quantity}</p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Misc */}
        {itemDetails &&
          itemDetails.some(
            (item) => item.category && item.category.toLowerCase() === "misc"
          ) && (
            <>
              <h4 className="list-details__subheader">Misc:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter((item) => item.category?.toLowerCase() === "misc")
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                        {item.quantity && (
                          <p className="item-list__qty"> QTY:{item.quantity}</p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Food & snacks */}
        {itemDetails &&
          itemDetails.some(
            (item) => item.category?.toLowerCase() === "food"
          ) && (
            <>
              <h4 className="list-details__subheader">Food & snacks:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails.map((item) =>
                    item.category?.toLowerCase() === "food" ? (
                      <li className="item-list__group" key={item.item}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          <span className="item-list__name">{item.item}</span>
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </>
          )}
      </div>
    </section>
  );
}
