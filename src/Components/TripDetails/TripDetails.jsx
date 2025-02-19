import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TripDetails.scss";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState("");
  const [itemDetails, setItemDetails] = useState("");
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

  const handleItemChange = (itemId, newValue) => {
    setItemDetails((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, item: newValue } : item
      )
    );
  };

  const updateItem = async (tripId, itemId, updatedItemData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/trips/${tripId}/items`,
        {
          id: itemId,
          ...updatedItemData,
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

  const [editingItemId, setEditingItemId] = useState(null);
  const [editedText, setEditedText] = useState({});

  const handleEditClick = (id, text) => {
    setEditingItemId(id);
    setEditedText((prev) => ({ ...prev, [id]: text }));
  };

  const handleBlur = () => {
    setEditingItemId(null);
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
              {tag}
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
        {/* Before you go */}
        {itemDetails &&
          itemDetails.some(
            (item) =>
              item.category.toLowerCase() === "before you go" ||
              item.category.toLowerCase() === "before-you-go"
          ) && (
            <>
              <h4 className="list-details__subheader">Before you go::</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter(
                      (item) =>
                        item.category?.toLowerCase() === "before-you-go" ||
                        item.category.toLowerCase() === "before you go"
                    )
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          {editingItemId === item.id ? (
                            <input
                              type="text"
                              value={editedText[item.id] || item.item}
                              onChange={(e) => {
                                setEditedText((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }));
                                handleItemChange(item.id, e.target.value);
                              }}
                              onBlur={() => {
                                handleSaveChanges(item);
                                handleBlur();
                              }}
                              autoFocus
                              className="editable-input"
                            />
                          ) : (
                            <span
                              className="item-list__name"
                              onClick={() =>
                                handleEditClick(item.id, item.item)
                              }
                            >
                              {item.item}
                            </span>
                          )}
                        </div>
                        {item.link && (
                          <a className="item-list__link" href={item.link}>
                            more info
                          </a>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

        {/* Documents */}
        {itemDetails &&
          itemDetails.some(
            (item) => item.category?.toLowerCase() === "documents"
          ) && (
            <>
              <h4 className="list-details__subheader">Documents:</h4>
              <div className="list-details__items">
                <ul className="item-list">
                  {itemDetails
                    .filter(
                      (item) => item.category?.toLowerCase() === "documents"
                    )
                    .map((item) => (
                      <li className="item-list__group" key={item.id}>
                        <div className="item-list__label checkbox-wrapper">
                          <input
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                            type="checkbox"
                            className="item-list__checkbox"
                          />
                          {editingItemId === item.id ? (
                            <input
                              type="text"
                              value={editedText[item.id] || item.item}
                              onChange={(e) => {
                                setEditedText((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }));
                                handleItemChange(item.id, e.target.value);
                              }}
                              onBlur={() => {
                                handleSaveChanges(item);
                                handleBlur();
                              }}
                              autoFocus
                              className="editable-input"
                            />
                          ) : (
                            <span
                              className="item-list__name"
                              onClick={() =>
                                handleEditClick(item.id, item.item)
                              }
                            >
                              {item.item}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
                            checked={checkedItems[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
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
