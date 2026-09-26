import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-card">

            <h2>No Payment Found</h2>

            <p>
              Please create a laundry booking first.
            </p>

            <button
              className="booking-button"
              onClick={() =>
                navigate("/book-laundry")
              }
            >
              Go to Booking
            </button>

          </div>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    navigate("/payment-success", {
      state: booking,
    });
  };

  return (
    <div className="booking-page">

      <div className="booking-container">

        <h1>Payment 💳</h1>

        <p className="booking-subtitle">
          Complete your payment to confirm your
          laundry booking.
        </p>

        <div className="booking-card">

          <div className="summary-item">
            <span>Service</span>
            <strong>
              {booking.service}
            </strong>
          </div>

          <div className="summary-item">
            <span>Quantity</span>
            <strong>
              {booking.quantity} kg
            </strong>
          </div>

          <div className="summary-item">
            <span>Pickup Date</span>
            <strong>
              {new Date(
                booking.bookingDate
              ).toLocaleDateString("en-IN")}
            </strong>
          </div>

          <div className="summary-item">
            <span>Pickup Session</span>
            <strong>
              {booking.slot}
            </strong>
          </div>

          <div className="summary-item">
            <span>Collection Point</span>
            <strong>
              {booking.collectionPoint}
            </strong>
          </div>

          <div className="booking-total">
            <span>Total Amount</span>

            <strong>
              ₹{booking.totalAmount}
            </strong>
          </div>

          <button
            className="booking-button"
            onClick={handlePayment}
          >
            Pay ₹{booking.totalAmount}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Payment;