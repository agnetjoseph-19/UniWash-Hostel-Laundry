import { useLocation, useNavigate } from "react-router-dom";

function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="booking-page">
        <div className="booking-container">

          <div className="booking-card">

            <h2>No Booking Found</h2>

            <p>
              Please create a laundry booking first.
            </p>

            <button
              className="booking-button"
              onClick={() => navigate("/book-laundry")}
            >
              Go to Booking
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">

      <div className="booking-container">

        <h1>Booking Summary</h1>

        <p className="booking-subtitle">
          Review your laundry booking before continuing.
        </p>

        <div className="booking-card">

          <div className="summary-item">
            <span>Service</span>
            <strong>{booking.service}</strong>
          </div>

          <div className="summary-item">
            <span>Quantity</span>
            <strong>{booking.quantity} kg</strong>
          </div>

          <div className="summary-item">
            <span>Pickup Day</span>
            <strong>{booking.pickupDay}</strong>
          </div>

          <div className="summary-item">
            <span>Pickup Time</span>
            <strong>{booking.pickupTime}</strong>
          </div>

          <div className="summary-item">
            <span>Collection Point</span>
            <strong>{booking.collectionPoint}</strong>
          </div>

          <div className="booking-total">
            <span>Total Amount</span>
            <strong>₹{booking.totalPrice}</strong>
          </div>

          <button
            className="booking-button"
            onClick={() =>
              navigate("/payment", {
                state: booking,
              })
            }
          >
            Proceed to Payment
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookingSummary;