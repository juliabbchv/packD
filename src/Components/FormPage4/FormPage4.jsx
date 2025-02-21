import axios from "axios";
import "./FormPage4.scss";
import { useNavigate } from "react-router-dom";

export default function FormPage4({ listDetails, loading }) {
  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      const sentObject = {
        user_id: 1,
        list: [listDetails.packingList.list],
        destination: listDetails.packingList.trip.destination,
        trip_purpose: listDetails.packingList.trip.trip_purpose,
        activities: listDetails.packingList.trip.activities,
        trip_name: `Trip to ${listDetails.packingList.trip.destination}`,
        isPublic: 0,
        isSaved: 0,
      };

      const addTripDetails = await axios.post(
        "http://localhost:8080/trips",
        sentObject
      );

      const tripId = addTripDetails.data.id;

      console.log("Trip added");

      navigate(`/dashboard/trips/${tripId}`);
    } catch (err) {
      console.error("Error creating new trip", err);
    }
  };

  return loading ? (
    <div className="loading-container">
      <div className="spinner">Generating...</div>
    </div>
  ) : (
    <section className="packing-list">
      {listDetails && (
        <>
          <h3 className="packing-list__title">
            Your Packing List for {listDetails.packingList.trip.destination} is
            ready!
          </h3>

          <div className="list-details">
            {/* Before You Go */}
            <h4 className="list-details__subheader">Before you go:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category === "before you go" ||
                  item.category === "before-you-go" ? (
                    <li className="item-list__group" key={item.id}>
                      <div className="item-list__label checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="item-list__checkbox"
                        />
                        <span className="item-list__name">{item.item}</span>
                      </div>
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
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* Documents */}
            <h4 className="list-details__subheader">Documents:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category === "documents" ? (
                    <li className="item-list__group" key={item.id}>
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

            {/* Clothes */}
            <h4 className="list-details__subheader">Clothes:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category.toLowerCase() === "clothes" ? (
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
                  ) : null
                )}
              </ul>
            </div>
            {/* Activity items*/}
            {listDetails.packingList.list.some(
              (item) =>
                item.category.toLowerCase() === "activity-items" ||
                item.category.toLowerCase() === "activity-related items"
            ) && (
              <>
                <h4 className="list-details__subheader">Activity items:</h4>
                <div className="list-details__items">
                  <ul className="item-list">
                    {listDetails.packingList.list.map((item) =>
                      item.category.toLowerCase() === "activity-items" ||
                      item.category.toLowerCase() ===
                        "activity-related items" ? (
                        <li className="item-list__group" key={item.id}>
                          <div className="item-list__label checkbox-wrapper">
                            <input
                              type="checkbox"
                              className="item-list__checkbox"
                            />
                            <span className="item-list__name">{item.item}</span>
                          </div>
                          {item.quantity && (
                            <p className="item-list__qty">
                              {" "}
                              QTY:{item.quantity}
                            </p>
                          )}
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </>
            )}

            {/* Tech */}
            <h4 className="list-details__subheader">Tech:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category.toLowerCase() === "tech" ? (
                    <li className="item-list__group" key={item.id}>
                      <div className="item-list__label checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="item-list__checkbox"
                        />
                        <span className="item-list__name">{item.item}</span>
                      </div>
                      {item.link && (
                        <p className="item-list__link">
                          <a href={item.link}>more info</a>
                        </p>
                      )}
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* Toiletries & Health */}
            <h4 className="list-details__subheader">Toiletries & health:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category.toLowerCase() === "toiletries" ||
                  item.category.toLowerCase() === "health" ? (
                    <li className="item-list__group" key={item.id}>
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

            {/* Misc */}
            {listDetails.packingList.list.some(
              (item) => item.category?.toLowerCase() === "misc"
            ) && (
              <>
                <h4 className="list-details__subheader">Misc:</h4>
                <div className="list-details__items">
                  <ul className="item-list">
                    {listDetails.packingList.list.map((item) =>
                      item.category.toLowerCase() === "misc" ? (
                        <li className="item-list__group" key={item.id}>
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

            {/* Food & snacks */}
            {listDetails.packingList.list.some(
              (item) => item.category?.toLowerCase() === "food"
            ) && (
              <>
                <h4 className="list-details__subheader">Food & snacks:</h4>
                <div className="list-details__items">
                  <ul className="item-list">
                    {listDetails.packingList.list.map((item) =>
                      item.category.toLowerCase() === "food" ? (
                        <li className="item-list__group" key={item.id}>
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

          <button className="form__btn form__btn--next" onClick={handleSave}>
            Save List
          </button>
        </>
      )}
    </section>
  );
}
