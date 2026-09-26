import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(
        localStorage.getItem("uniwashUser")
      );

      if (!user || !user.id) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/student/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Failed to load bookings."
          );
          return;
        }

        setBookings(data.bookings || []);
      } catch (error) {
        console.error(error);

        alert(
          "Cannot connect to the UniWash backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="bookings-container">
          <h1>My Bookings 📋</h1>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">

      <div className="bookings-container">

        <h1>My Bookings 📋</h1>

        <p className="bookings-subtitle">
          View and track your laundry bookings.
        </p>

        {bookings.length === 0 ? (
          <div className="booking-card empty-bookings">

            <h2>No Bookings Yet</h2>

            <p>
              You haven't created any laundry
              bookings yet.
            </p>

            <button
              className="booking-button"
              onClick={() =>
                navigate("/book-laundry")
              }
            >
              Book Laundry
            </button>

          </div>
        ) : (
          <div className="bookings-list">

            {bookings.map((booking) => (

              <div
                className="booking-card booking-history-card"
                key={booking._id}
              >

                <div className="booking-history-header">

                  <div>
                    <span>Booking ID</span>

                    <strong>
                      {booking._id.slice(-8).toUpperCase()}
                    </strong>
                  </div>

                  <span className="booking-status">
                    {booking.status}
                  </span>

                </div>

                <div className="booking-history-details">

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

                  <div>
                    <span>Payment</span>
                    <strong>
                      {booking.paymentStatus}
                    </strong>
                  </div>

                  <div>
                    <span>Amount</span>
                    <strong>
                      ₹{booking.totalAmount}
                    </strong>
                  </div>

                </div>

                <button
                  className="booking-button"
                  onClick={() =>
                    navigate("/laundry-status", {
                      state: booking,
                    })
                  }
                >
                  Track Laundry
                </button>

              </div>

            ))}

          </div>
        )}

        <button
          className="booking-button"
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default MyBookings;