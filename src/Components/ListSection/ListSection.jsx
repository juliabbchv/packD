import { useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import "./ListSection.scss";
import deleteIcon from "../../Assets/Images/delete.svg";

export default function ListSection({
  category,
  items,
  checkedItems,
  handleCheckboxChange,
  setItemDetails,
  fetchItems,
}) {
  const [editingQtyId, setEditingQtyId] = useState(null);
  const [editedQty, setEditedQty] = useState({});
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemQty, setNewItemQty] = useState(1);
  const location = useLocation();
  const { id } = useParams();

  const handleItemChange = (itemId, newValue) => {
    setItemDetails((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newValue } : item
      )
    );
  };

  const handleSaveQuantity = (item) => {
    setEditingQtyId(null);

    const updatedItemData = {
      item: item.item,
      link: item.link,
      quantity: editedQty[item.id] || item.quantity,
    };

    updateItem(item.trip_id, item.id, updatedItemData);
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

  const handleAddItem = async () => {
    if (!newItem.trim()) return;

    const newItemData = {
      item: newItem,
      quantity: Number(newItemQty),
      category: category,
      trip_id: id,
    };

    try {
      await axios.post(`http://localhost:8080/trips/${id}/items`, newItemData);
      fetchItems();
      setNewItem("");
      setIsAddingItem(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/items/${itemId}`);
      setItemDetails((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  return (
    <>
      {items && (
        <section className="list-details__section">
          <h4 className="list-details__subheader">{category}:</h4>
          <div className="list-details__items">
            <ul className="item-list">
              {items.map((item) => (
                <li className="item-list__group" key={item.id}>
                  <div className="item-list__label checkbox-wrapper">
                    {location.pathname.includes("/dashboard/trips") && (
                      <input
                        checked={checkedItems[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                        type="checkbox"
                        className="item-list__checkbox"
                      />
                    )}

                    <span className="item-list__name">{item.item}</span>
                  </div>

                  {item.quantity && (
                    <p
                      className="item-list__qty item-list__qty--editable"
                      onClick={() => setEditingQtyId(item.id)}
                    >
                      {" "}
                      QTY:
                      {location.pathname.includes("/dashboard/trips") &&
                      editingQtyId === item.id ? (
                        <input
                          type="number"
                          value={editedQty[item.id] || item.quantity}
                          onChange={(e) => {
                            setEditedQty((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }));
                            handleItemChange(item.id, e.target.value);
                          }}
                          onBlur={() => handleSaveQuantity(item)}
                          className="editable-input"
                        />
                      ) : (
                        item.quantity
                      )}
                    </p>
                  )}

                  {item.link && (
                    <p className="item-list__link">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        more info
                      </a>
                    </p>
                  )}
                  <img
                    className="delete-icon"
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => deleteItem(item.id)}
                  />
                </li>
              ))}
            </ul>

            {location.pathname.startsWith("/dashboard/trips") &&
            isAddingItem ? (
              <div className="add-item">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Enter item name"
                  className="add-item__input"
                />

                <input
                  type="number"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                  placeholder="Qty"
                  className="add-item__input  add-item__input--qty"
                />
                <button onClick={handleAddItem} className="add-item__btn">
                  Save
                </button>
                <button
                  onClick={() => setIsAddingItem(false)}
                  className="add-item__btn"
                >
                  Cancel
                </button>
              </div>
            ) : location.pathname.startsWith("/dashboard/trips") ? (
              <button
                onClick={() => setIsAddingItem(true)}
                className="add-item__btn"
              >
                + Add New Item
              </button>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
