import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePayment = async () => {
      if (!booking || !booking.bookingId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/${booking.bookingId}/payment`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setPaymentDone(true);

          // Update booking information
          booking.paymentStatus = "Paid";
        } else {
          alert(
            data.message ||
              "Payment update failed."
          );
        }
      } catch (error) {
        console.error(error);

        alert(
          "Cannot connect to the UniWash backend."
        );
      } finally {
        setLoading(false);
      }
    };

    updatePayment();
  }, [booking]);

  if (!booking) {
    return (
      <div className="success-page">
        <div className="success-card">

          <h2>No Booking Found</h2>

          <p>
            Please create a laundry booking first.
          </p>

          <button
            onClick={() =>
              navigate("/book-laundry")
            }
          >
            Go to Booking
          </button>

        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="success-page">
        <div className="success-card">

          <h2>Processing Payment...</h2>

          <p>
            Please wait while we confirm your
            payment.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          {paymentDone
            ? "Payment Successful!"
            : "Payment Failed"}
        </h1>

        <p className="success-message">
          {paymentDone
            ? "Your laundry booking has been confirmed."
            : "We could not confirm your payment."}
        </p>

        <div className="success-details">

          <div>
            <span>Booking ID</span>
            <strong>
              {booking.bookingId}
            </strong>
          </div>

          <div>
            <span>Service</span>
            <strong>
              {booking.service}
            </strong>
          </div>

          <div>
            <span>Quantity</span>
            <strong>
              {booking.quantity} kg
            </strong>
          </div>

          <div>
            <span>Pickup Date</span>
            <strong>
              {new Date(
                booking.bookingDate
              ).toLocaleDateString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Pickup Session</span>
            <strong>
              {booking.slot}
            </strong>
          </div>

          <div>
            <span>Collection Point</span>
            <strong>
              {booking.collectionPoint}
            </strong>
          </div>

          <div className="success-total">
            <span>Amount Paid</span>
            <strong>
              ₹{booking.totalAmount}
            </strong>
          </div>

        </div>

        <button
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default PaymentSuccess;