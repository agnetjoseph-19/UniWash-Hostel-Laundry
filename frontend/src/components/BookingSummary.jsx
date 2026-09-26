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

  // Format date
  const formattedDate = new Date(
    booking.bookingDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="booking-page">
      <div className="booking-container">

        <h1>Booking Summary 📋</h1>

        <p className="booking-subtitle">
          Review your laundry booking before
          continuing.
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
              {formattedDate}
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

          <div className="summary-item">
            <span>Payment Status</span>
            <strong>
              {booking.paymentStatus}
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