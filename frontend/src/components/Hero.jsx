import PickupBanner from "./PickupBanner";
function Hero() {
  return (
    <section className="hero">
      <div>
        <p>SMART CAMPUS LAUNDRY</p>

        <h1>
          Campus Laundry,
          <br />
          Simplified.
        </h1>

        <p>
          Easy laundry booking for hostel students with
          <br />
          convenient pickup and 48-hour delivery.
        </p>

        <div>
          <button>Book a Wash Slot</button>
          <button>Track My Order</button>
        </div>
      </div>

      <div>
        <p>Next Pickup</p>
        <h2>Monday</h2>
        <p>7:00 AM – 9:00 AM</p>
      </div>
    </section>
  );
}

export default Hero;