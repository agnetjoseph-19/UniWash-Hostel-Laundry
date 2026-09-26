import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LaundryStatus() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingFromState = location.state;

  const [booking, setBooking] =
    useState(bookingFromState);

  const [loading, setLoading] =
    useState(!bookingFromState);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      if (bookingFromState) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(
        localStorage.getItem("uniwashUser")
      );

      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/student/${user.id}`
        );

        const data = await response.json();

        if (
          response.ok &&
          data.bookings.length > 0
        ) {
          setBooking(data.bookings[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooking();
  }, [bookingFromState, navigate]);

  if (loading) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h2>
            Loading Laundry Status...
          </h2>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="success-page">
        <div className="success-card">

          <h2>No Booking Found</h2>

          <p>
            Create a laundry booking to
            track its status.
          </p>

          <button
            onClick={() =>
              navigate("/book-laundry")
            }
          >
            Book Laundry
          </button>

        </div>
      </div>
    );
  }

  const statusSteps = [
    "Booking Confirmed",
    "Clothes Collected",
    "In Processing",
    "Washing",
    "Drying",
    "Ironing",
    "Ready for Delivery",
    "Delivered",
    "Completed",
  ];

  const currentIndex =
    statusSteps.indexOf(
      booking.status
    );

  // Format delivery deadline
  const formattedDeadline =
    booking.deliveryDeadline
      ? new Date(
          booking.deliveryDeadline
        ).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Not available";

  return (
    <div className="success-page">

      <div className="success-card">

        <h1>
          Laundry Status 🚚
        </h1>

        <p className="success-message">
          Track your laundry booking in
          real time.
        </p>

        <div className="success-details">

          <div>
            <span>Booking ID</span>

            <strong>
              {booking._id
                .slice(-8)
                .toUpperCase()}
            </strong>
          </div>

          <div>
            <span>Service</span>

            <strong>
              {booking.service}
            </strong>
          </div>

          <div>
            <span>Pickup Date</span>

            <strong>
              {new Date(
                booking.bookingDate
              ).toLocaleDateString(
                "en-IN"
              )}
            </strong>
          </div>

          <div>
            <span>Pickup Session</span>

            <strong>
              {booking.slot}
            </strong>
          </div>

          <div>
            <span>
              Collection Point
            </span>

            <strong>
              {booking.collectionPoint}
            </strong>
          </div>

          <div>
            <span>Payment</span>

            <strong>
              {booking.paymentStatus}
            </strong>
          </div>

          {/* 48-hour delivery deadline */}
          <div>
            <span>
              🕐 Delivery Deadline
            </span>

            <strong>
              {formattedDeadline}
            </strong>
          </div>

        </div>

        <div className="status-tracker">

          {statusSteps.map(
            (step, index) => (

              <div
                key={step}
                className={
                  index <= currentIndex
                    ? "status-step active"
                    : "status-step"
                }
              >

                <div className="status-circle">
                  {index <=
                  currentIndex
                    ? "✓"
                    : index + 1}
                </div>

                <span>
                  {step}
                </span>

              </div>
            )
          )}

        </div>

        <div className="booking-total">

          <span>
            Current Status
          </span>

          <strong>
            {booking.status}
          </strong>

        </div>

        <button
          onClick={() =>
            navigate(
              "/student-dashboard"
            )
          }
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default LaundryStatus;