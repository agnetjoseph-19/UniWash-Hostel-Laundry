import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="success-page">
        <div className="success-card">

          <h2>No Booking Found</h2>

          <p>
            Please create a laundry booking first.
          </p>

          <button
            onClick={() => navigate("/book-laundry")}
          >
            Go to Booking
          </button>

        </div>
      </div>
    );
  }

  const bookingId =
    "UW" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Your laundry booking has been confirmed.
        </p>

        <div className="success-details">

          <div>
            <span>Booking ID</span>
            <strong>{bookingId}</strong>
          </div>

          <div>
            <span>Service</span>
            <strong>{booking.service}</strong>
          </div>

          <div>
            <span>Quantity</span>
            <strong>{booking.quantity} kg</strong>
          </div>

          <div>
            <span>Pickup Day</span>
            <strong>{booking.pickupDay}</strong>
          </div>

          <div>
            <span>Collection Point</span>
            <strong>{booking.collectionPoint}</strong>
          </div>

          <div className="success-total">
            <span>Amount Paid</span>
            <strong>₹{booking.totalPrice}</strong>
          </div>

        </div>

        <button
          onClick={() => navigate("/student-dashboard")}
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default PaymentSuccess;