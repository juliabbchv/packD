import "./About.scss";
import Form from "../../Assets/Images/form.png";

export default function About() {
  return (
    <section className="features">
      <h2 className="features__header features__header--bold">
        Why You'll Love PackD
      </h2>
      <div className="features__cards">
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">
              Your Personal Packing Assistant
            </h3>
            <p className="features__card-description">
              Let our AI do the heavy lifting! Get a packing list that’s
              perfectly tailored to you—plus, save and tweak it however you
              want. Stress-free packing, every time.
            </p>
          </div>
        </div>
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">
              See What Others Are Bringing
            </h3>
            <p className="features__card-description">
              Check out what fellow travelers are packing to get ideas and make
              sure you’re not forgetting anything. It’s all about sharing and
              learning from each other!
            </p>
          </div>
        </div>
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">Packing for Any Adventure</h3>
            <p className="features__card-description">
              From camping in the mountains to business trips in the city, PackD
              has got you covered. We’ve got recommendations for every type of
              trip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
