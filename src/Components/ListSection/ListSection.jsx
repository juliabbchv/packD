import { useState } from "react";
import axios from "axios";

export default function ListSection({
  category,
  items,
  checkedItems,
  handleCheckboxChange,
  setItemDetails,
}) {
  const [editingQtyId, setEditingQtyId] = useState(null);
  const [editedQty, setEditedQty] = useState({});

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

  return (
    <>
      {items.length > 0 && (
        <>
          <h4 className="list-details__subheader">{category}:</h4>
          <div className="list-details__items">
            <ul className="item-list">
              {items.map((item) => (
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
                    <p
                      className="item-list__qty item-list__qty--editable"
                      onClick={() => setEditingQtyId(item.id)}
                    >
                      {" "}
                      QTY:
                      {editingQtyId === item.id ? (
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
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
