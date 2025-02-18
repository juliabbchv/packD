import axios from "axios";
import "./UserLists.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rightArrow from "../../Assets/Images/right-arrow.svg";

export default function UserLists() {
  const [userLists, setUserLists] = useState("");

  useEffect(() => {
    async function generateUserLists() {
      try {
        const response = await axios.get("http://localhost:8080/trips");
        setUserLists(response.data);
      } catch (err) {
        console.log("Error fetching trips", err);
      }
    }

    generateUserLists();
  }, []);

  console.log(userLists);

  return (
    <section className="user-lists">
      <h2 className="user-lists__title">Your Recent Trips</h2>
      <article className="user-lists__main-content">
        <div className="user-list-cards ">
          {userLists &&
            userLists
              .filter((list) => list.user_id === 1)
              .map((list) => (
                <div key={list.id} className="trip-card">
                  <div>
                    <Link to={`/dashboard/trips/${list.id}`}>
                      <div className="trip-card__title-wrapper">
                        <h3 className="trip-card__title">{list.trip_name}</h3>
                        <img className="action-icon" src={rightArrow} alt="" />
                      </div>
                    </Link>

                    <div className="switchwrap">
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                      <span>Private</span>
                    </div>
                  </div>
                  <ul className="trip-card__tag-list">
                    <li className="trip-card__tag-list-item">
                      {list.destination}
                    </li>
                    {list.activities.split(",").map((activity, index) => (
                      <li className="trip-card__tag-list-item" key={index}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
        </div>
      </article>
    </section>
  );
}
