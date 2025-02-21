import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import axios from "axios";
import "./UserLists.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rightArrow from "../../Assets/Images/right-arrow.svg";
import fetchCityImage from "../../Services/googlePlacesPhotosApi";

export default function UserLists() {
  const [userLists, setUserLists] = useState("");
  const [cityImages, setCityImages] = useState({});

  const togglePublic = (id) => {
    setUserLists((prevLists) =>
      prevLists.map((item) =>
        item.id === id
          ? { ...item, isPublic: item.isPublic === 1 ? 0 : 1 }
          : item
      )
    );
  };

  useEffect(() => {
    async function generateUserLists() {
      try {
        const response = await axios.get("http://localhost:8080/trips");
        setUserLists(response.data);

        const images = {};
        for (const list of response.data) {
          if (list.destination) {
            const imageUrl = await fetchCityImage(list.destination);
            images[list.id] = imageUrl;
          }
        }
        setCityImages(images);
      } catch (err) {
        console.log("Error fetching trips", err);
      }
    }

    generateUserLists();
  }, []);

  return (
    <section className="user-lists">
      <h2 className="user-lists__title">Your Recent Trips</h2>
      <article className="user-lists__main-content user-lists__main-content--dashboard">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <ul className="user-list-cards ">
            {userLists &&
              userLists
                .filter((list) => list.user_id === 1)
                .map((list) => (
                  <SwiperSlide key={list.id}>
                    <li
                      className="trip-card"
                      style={{
                        backgroundImage: cityImages[list.id]
                          ? `url(${cityImages[list.id]})`
                          : `url("../../Assets/Images/suitcase.jpg")`,
                      }}
                    >
                      <div className="trip-card__top">
                        <Link to={`/dashboard/trips/${list.id}`}>
                          <div className="trip-card__title-wrapper">
                            <h3 className="trip-card__title">
                              {list.trip_name}
                            </h3>
                            <img
                              className="action-icon"
                              src={rightArrow}
                              alt="right arrow icon"
                            />
                          </div>
                        </Link>
                        <div className="switchwrap">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={list.isPublic === 1}
                              disabled
                            />
                            <span className="slider round"></span>
                          </label>
                          <span>
                            {list.isPublic === 1 ? "Public" : "Private"}
                          </span>
                        </div>
                      </div>
                      <ul className="trip-card__tag-list">
                        <li className="trip-card__tag-list-item">
                          {list.destination}
                        </li>
                        {list.activities.split(",").map((activity, index) => (
                          <li className="trip-card__tag-list-item" key={index}>
                            {activity.toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </SwiperSlide>
                ))}
          </ul>
        </Swiper>
      </article>
    </section>
  );
}
