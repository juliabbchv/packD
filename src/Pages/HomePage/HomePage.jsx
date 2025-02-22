import Header from "../../Components/MainHeader/MainHeader";
import Hero from "../../Components/Hero/Hero";
import About from "../../Components/About/About";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
      <footer className="footer">
        <p className="footer__text">
          Copyright © 2025 Julia Babicheva. All rights reserved.
        </p>
      </footer>
    </>
  );
}
