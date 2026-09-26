import { useEffect, useState } from "react";

function StaffDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings/all"
      );

      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Status update failed."
        );
        return;
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === id
            ? data.booking
            : booking
        )
      );

      alert("Status updated successfully! 🎉");
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to the UniWash backend."
      );
    }
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <h1>Laundry Staff Dashboard 🧺</h1>

        <p className="dashboard-subtitle">
          Manage laundry orders and update their status.
        </p>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="dashboard-card">
            <h3>No Bookings</h3>
            <p>
              There are no laundry bookings yet.
            </p>
          </div>
        ) : (
          <div className="bookings-list">

            {bookings.map((booking) => (

              <div
                className="booking-card"
                key={booking._id}
              >

                <h3>
                  Booking #
                  {booking._id
                    .slice(-8)
                    .toUpperCase()}
                </h3>

                <p>
                  <strong>Student:</strong>{" "}
                  {booking.studentId?.name ||
                    "Student"}
                </p>

                <p>
                  <strong>Service:</strong>{" "}
                  {booking.service}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {booking.quantity} kg
                </p>

                <p>
                  <strong>Pickup:</strong>{" "}
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString("en-IN")}
                </p>

                <p>
                  <strong>Session:</strong>{" "}
                  {booking.slot}
                </p>

                <p>
                  <strong>Collection Point:</strong>{" "}
                  {booking.collectionPoint}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {booking.paymentStatus}
                </p>

                <p>
                  <strong>Current Status:</strong>{" "}
                  {booking.status}
                </p>

                <label>
                  Update Status
                </label>

                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(
                      booking._id,
                      e.target.value
                    )
                  }
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default StaffDashboard;