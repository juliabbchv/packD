import "./Page404.scss";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <main className="not-found-section">
      <div className="not-found-section__text-wrap">
        <h1 className="not-found-section__title">
          Oops! Looks like we can't find this page.
        </h1>
        <p className="not-found-section__text">
          We checked your itinerary, rummaged through your suitcase, and even
          searched under the hotel bed… but this page is nowhere to be found!
          Maybe it got lost in transit? Or is stuck at baggage claim?
        </p>
      </div>
      <button className="not-found-section__btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </main>
  );
}
