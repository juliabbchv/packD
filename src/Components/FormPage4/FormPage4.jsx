import axios from "axios";
import "./FormPage4.scss";

export default function FormPage4({ listDetails }) {
  console.log(listDetails);
  const handleSave = async () => {
    try {
      const sentObject = {
        user_id: 1,
        list: [listDetails.packingList.list],
        destination: listDetails.packingList.trip.destination,
        trip_purpose: listDetails.packingList.trip.trip_purpose,
        activities: listDetails.packingList.trip.activities,
        trip_name: "New Name",
        isPublic: 0,
        isSaved: 0,
      };

      console.log("Object", sentObject);

      const addTripDetails = await axios.post(
        "http://localhost:8080/trips",
        sentObject
      );

      console.log("Trip added");
    } catch (err) {
      console.error("Error creating new trip", err);
    }
  };

  return (
    <section className="packing-list">
      {listDetails && (
        <>
          <h3 className="packing-list__title">
            Your Packing List for {listDetails.packingList.trip.destination} is
            ready!
          </h3>

          <div className="list__details">
            {/* Before You Go */}
            <h4 className="list__details__subheader">Before you go:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category === "before you go" ||
                  item.category === "before-you-go" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                      {item.link && (
                        <a
                          className="item-list__link"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔗
                        </a>
                      )}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* Documents */}
            <h4 className="list__details__subheader">Documents:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category === "documents" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* Clothes */}
            <h4 className="list__details__subheader">Clothes:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category?.toLowerCase() === "clothes" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                      <p className="item-list__name">{item.quantity}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* Activity-related items */}
            <h4 className="list__details__subheader">
              Activity-related items:
            </h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category?.toLowerCase() === "activity-related items" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                      <p className="item-list__name">{item.quantity}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* Tech */}
            <h4 className="list__details__subheader">Tech:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category?.toLowerCase() === "tech" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                      <p className="">
                        <a href={item.link}>🔗 </a>
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* Toiletries & health: */}
            <h4 className="list__details__subheader">Toiletries & health:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category?.toLowerCase() === "toiletries" ||
                  item.category?.toLowerCase() === "health" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            {/* Misc: */}
            <h4 className="list__details__subheader">Misc:</h4>
            <div className="list-details__items">
              <ul className="item-list">
                {listDetails.packingList.list.map((item) =>
                  item.category?.toLowerCase() === "misc" ? (
                    <li className="item-list__group" key={item.item}>
                      <p className="item-list__name">{item.item}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>

          <button onClick={handleSave}>Save list</button>
        </>
      )}

      <pre>{JSON.stringify(listDetails, null, 2)}</pre>
    </section>
  );
}
