import "./hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">
          Start your next trip
          <span className="italic underline"> perfectly packD</span>
        </h1>
        <p className="hero__secondary">
          Smart packing lists for any adventure—curated by AI and real travelers
          like you.
        </p>
      </div>
    </section>
  );
}
