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
    </>
  );
}
