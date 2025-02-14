import axios from "axios";
import "./UserLists.scss";
import { useEffect, useState } from "react";

export default function UserLists() {
  const userLists = [
    {
      id: 1,
      title: "Adventure in Japan",
      destination: "Tokyo, Japan",
      activities: ["Sightseeing", "Camping", "Winter sports"],
      items: 15,
    },
    {
      id: 2,
      title: "Camping trip to Yosemite ",
      destination: "Yosemite, USA",
      items: 10,
    },
    {
      id: 3,
      title: "Adventure in Japan",
      destination: "Tokyo, Japan",
      activities: ["Sightseeing", "Camping", "Winter sports"],
      items: 15,
    },
    {
      id: 4,
      title: "Camping trip to Yosemite ",
      destination: "Yosemite, USA",
      items: 10,
    },
  ];

  return (
    <section className="user-lists">
      <h2 className=" user-lists__title">Your Lists</h2>
      <article className="user-lists__main-content">
        <div className="user-list-cards ">
          {userLists.map((list) => (
            <div key={list.id} className="trip-card">
              <div>
                <h3 className="trip-card__title">{list.title}</h3>
                <div className="switchwrap">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <span>Private</span>
                </div>
              </div>
              <ul className="trip-card__tag-list">
                <li className="trip-card__tag-list-item">{list.destination}</li>
                {list.activities &&
                  list.activities.map((activity, index) => (
                    <li key={index} className="trip-card__tag-list-item">
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
