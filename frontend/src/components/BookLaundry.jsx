import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookLaundry() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pickupDay, setPickupDay] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [collectionPoint, setCollectionPoint] = useState("");

  const services = {
    "Washing Only": 40,
    "Washing + Drying": 60,
    "Washing + Drying + Ironing": 80,
    "Washing + Starch + Drying + Ironing": 100,
    "Ironing Only": 20,
  };

  const totalPrice = service
    ? services[service] * quantity
    : 0;

  const handleContinue = (e) => {
    e.preventDefault();

    if (
      !service ||
      !pickupDay ||
      !pickupTime ||
      !collectionPoint
    ) {
      alert("Please fill in all booking details.");
      return;
    }

    navigate("/booking-summary", {
      state: {
        service,
        quantity,
        pickupDay,
        pickupTime,
        collectionPoint,
        totalPrice,
      },
    });
  };

  return (
    <div className="booking-page">

      <div className="booking-container">

        <h1>Book Your Laundry 🧺</h1>

        <p className="booking-subtitle">
          Choose your service and pickup details.
        </p>

        <form
          className="booking-card"
          onSubmit={handleContinue}
        >

          <label>Choose Laundry Service</label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Select a service</option>

            {Object.keys(services).map((item) => (
              <option key={item} value={item}>
                {item} - ₹{services[item]}/kg
              </option>
            ))}
          </select>


          <label>Quantity (kg)</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />


          <label>Pickup Day</label>

          <select
            value={pickupDay}
            onChange={(e) => setPickupDay(e.target.value)}
          >
            <option value="">Select pickup day</option>
            <option value="Monday">Monday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Friday">Friday</option>
          </select>


          <label>Pickup Time</label>

          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          >
            <option value="">Select pickup time</option>
            <option value="7:00 AM - 8:00 AM">
              7:00 AM - 8:00 AM
            </option>
            <option value="8:00 AM - 9:00 AM">
              8:00 AM - 9:00 AM
            </option>
          </select>


          <label>Collection Point</label>

          <select
            value={collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
          >
            <option value="">Select collection point</option>
            <option value="Girls Hostel">
              Girls Hostel
            </option>
            <option value="PG Boys Hostel">
              PG Boys Hostel
            </option>
            <option value="College Store">
              College Store
            </option>
          </select>


          <div className="booking-total">
            <span>Total Amount</span>
            <strong>₹{totalPrice}</strong>
          </div>


          <button
            type="submit"
            className="booking-button"
          >
            Continue Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookLaundry;