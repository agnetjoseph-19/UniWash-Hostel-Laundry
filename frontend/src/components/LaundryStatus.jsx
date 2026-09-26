import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const statuses = [
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

function LaundryStatus() {
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(
    location.state || null
  );

  const [deadlineInfo, setDeadlineInfo] =
    useState(null);

  const [loading, setLoading] = useState(
    !location.state
  );

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("uniwashUser")
        );

        if (!user || !user.id) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/bookings/student/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message ||
              "Failed to load bookings."
          );
          return;
        }

        if (
          data.bookings &&
          data.bookings.length > 0
        ) {
          setBooking(
            location.state || data.bookings[0]
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch booking:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (!location.state) {
      fetchBooking();
    } else {
      setLoading(false);
    }
  }, [location.state, navigate]);

  // Fetch delivery deadline
  useEffect(() => {
    if (!booking?._id) {
      return;
    }

    const fetchDeadline = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/${booking._id}/deadline`
        );

        const data = await response.json();

        if (response.ok) {
          setDeadlineInfo(data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch deadline:",
          error
        );
      }
    };

    fetchDeadline();

    const interval = setInterval(
      fetchDeadline,
      60000
    );

    return () =>
      clearInterval(interval);
  }, [booking]);

  if (loading) {
    return (
      <div className="status-page">
        <h2>
          Loading laundry status...
        </h2>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="status-page">
        <h2>
          No booking found.
        </h2>

        <button
          onClick={() =>
            navigate("/my-bookings")
          }
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  const currentStatus =
    booking.status ||
    "Booking Confirmed";

  const currentIndex =
    statuses.indexOf(currentStatus);

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

  // Status notification message
  const statusMessages = {
    "Booking Confirmed":
      "Your laundry booking has been confirmed.",
    "Clothes Collected":
      "Your clothes have been collected.",
    "In Processing":
      "Your laundry is now being processed.",
    Washing:
      "Your clothes are currently being washed.",
    Drying:
      "Your clothes are currently being dried.",
    Ironing:
      "Your clothes are currently being ironed.",
    "Ready for Delivery":
      "Your laundry is ready for delivery.",
    Delivered:
      "Your laundry has been delivered.",
    Completed:
      "Your laundry service has been completed.",
  };

  const statusMessage =
    statusMessages[currentStatus];

  return (
    <div className="status-page">

      <h2>
        Laundry Status
      </h2>

      <div className="status-card">

        <h3>
          Current Status:{" "}
          {currentStatus}
        </h3>

        {/* Smart Status Notification */}
        {statusMessage && (
          <div className="status-notification">
            <span>
              🔔 Laundry Update
            </span>

            <strong>
              {statusMessage}
            </strong>
          </div>
        )}

        <div className="status-tracker">

          {statuses.map(
            (status, index) => (

              <div
                key={status}
                className={`status-step ${
                  index <= currentIndex
                    ? "active"
                    : ""
                }`}
              >

                <div className="status-circle">
                  {index <= currentIndex
                    ? "✓"
                    : index + 1}
                </div>

                <span>
                  {status}
                </span>

              </div>

            )
          )}

        </div>

        <div className="status-details">

          <div>
            <span>
              🧺 Service
            </span>

            <strong>
              {booking.service}
            </strong>
          </div>

          <div>
            <span>
              ⚖️ Quantity
            </span>

            <strong>
              {booking.quantity} kg
            </strong>
          </div>

          <div>
            <span>
              📍 Collection Point
            </span>

            <strong>
              {booking.collectionPoint}
            </strong>
          </div>

          <div>
            <span>
              🕐 Delivery Deadline
            </span>

            <strong>
              {formattedDeadline}
            </strong>
          </div>

          {deadlineInfo && (
            <div className="deadline-alert">

              <span>
                ⏳ Time Remaining
              </span>

              <strong>
                {deadlineInfo.expired
                  ? "Deadline passed"
                  : `${deadlineInfo.hoursRemaining} hours ${deadlineInfo.minutesRemaining} minutes`}
              </strong>

              {!deadlineInfo.expired &&
                deadlineInfo.hoursRemaining <=
                  6 && (
                    <p>
                      ⚠️ Delivery deadline is
                      approaching!
                    </p>
                  )}

            </div>
          )}

        </div>

        <button
          className="booking-button"
          onClick={() =>
            navigate("/my-bookings")
          }
        >
          Back to My Bookings
        </button>

      </div>

    </div>
  );
}

export default LaundryStatus;