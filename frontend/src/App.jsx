import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PickupBanner from "./components/PickupBanner";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WhyUniWash from "./components/WhyUniWash";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PickupBanner />
      <Services />
      <HowItWorks />
      <WhyUniWash />
      <Footer />
    </>
  );
}

export default App;