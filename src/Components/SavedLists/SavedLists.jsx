import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rightArrow from "../../Assets/Images/right-arrow.svg";
import fetchCityImage from "../../Services/googlePlacesPhotosApi";

export default function SavedLists() {
  const [userLists, setUserLists] = useState("");
  const [cityImages, setCityImages] = useState({});

  useEffect(() => {
    async function generateUserLists() {
      try {
        const response = await axios.get("http://localhost:8080/trips");
        setUserLists(response.data);

        const images = {};
        for (const list of response.data) {
          if (list.destination) {
            const cachedImage = localStorage.getItem(
              `cityImage_${list.destination}`
            );
            if (cachedImage) {
              console.log(`Using cached image for ${list.destination}`);
              images[list.id] = cachedImage;
            } else {
              const imageUrl = await fetchCityImage(list.destination);
              images[list.id] = imageUrl;
            }
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
      <h2 className="user-lists__title">Saved Trips</h2>
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
                .filter((list) => list.isSaved === 1)
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
                          <div className="trip-card__title-wrapper trip-card__title-wrapper--public">
                            <div className="trip-card__tile-group">
                              <h3 className="trip-card__title">
                                {list.trip_name}
                              </h3>

                              <img
                                className="action-icon"
                                src={rightArrow}
                                alt="right arrow icon"
                              />
                            </div>
                          </div>
                        </Link>
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
