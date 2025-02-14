import "./hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">
        Ready, set,
        <span className="italic"> packD!</span>
      </h1>
      <p className="hero__secondary">
        Smart packing lists for any adventure—curated by AI and real travelers
        like you.
      </p>
    </section>
  );
}
