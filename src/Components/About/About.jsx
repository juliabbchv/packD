import "./About.scss";
import suitcases from "../../Assets/Images/suitcases.jpg";

import duffleBag from "../../Assets/Images/duffle-bag.jpg";
import travelers from "../../Assets/Images/travelers.jpg";

export default function About() {
  return (
    <section className="features" id="features">
      <h2 className="features__header features__header--bold">
        Why You'll <span className="italic">Love</span> packD
      </h2>
      <div className="features__cards">
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">
              Packing Made Simple for Every Adventure
            </h3>
            <p className="features__card-description">
              Let our AI do the heavy lifting! Get a packing list that’s
              perfectly tailored to your trip—plus, save and tweak it however
              you want. Stress-free packing, every time.
            </p>
          </div>
          <img className="features__img" src={duffleBag} alt="duffle bag" />
          <div className="features__card-img"></div>
        </div>
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">
              Learn How Other Travelers Pack
            </h3>
            <p className="features__card-description">
              Check out what fellow travelers are packing to get ideas and make
              sure you’re not forgetting anything.
            </p>
          </div>
          <img className="features__img" src={travelers} alt="travelers" />
          <div className="features__card-img"></div>
        </div>
        <div className="features__card">
          <div className="features__card-text">
            <h3 className="features__card-header">Save, Reuse, And Share</h3>
            <p className="features__card-description">
              Plan once, pack effortlessly every time. Save your lists, reuse
              them for future trips, and share them with fellow travelers.
            </p>
          </div>
          <img className="features__img" src={suitcases} alt="" />
          <div className="features__card-img"></div>
        </div>
      </div>
    </section>
  );
}
