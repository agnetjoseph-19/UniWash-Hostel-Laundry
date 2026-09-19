import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const bookings = [
    {
      id: "UW1001",
      service: "Washing + Drying + Ironing",
      quantity: 3,
      pickupDay: "Monday",
      pickupTime: "7:00 AM - 8:00 AM",
      collectionPoint: "Girls Hostel",
      amount: 240,
      status: "Confirmed",
    },
    {
      id: "UW1002",
      service: "Washing Only",
      quantity: 2,
      pickupDay: "Wednesday",
      pickupTime: "8:00 AM - 9:00 AM",
      collectionPoint: "College Store",
      amount: 80,
      status: "Completed",
    },
  ];

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
              You haven't created any laundry bookings yet.
            </p>

            <button
              className="booking-button"
              onClick={() => navigate("/book-laundry")}
            >
              Book Laundry
            </button>

          </div>

        ) : (

          <div className="bookings-list">

            {bookings.map((booking) => (

              <div
                className="booking-card booking-history-card"
                key={booking.id}
              >

                <div className="booking-history-header">

                  <div>
                    <span>Booking ID</span>
                    <strong>{booking.id}</strong>
                  </div>

                  <span className="booking-status">
                    {booking.status}
                  </span>

                </div>

                <div className="booking-history-details">

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
                    <span>Pickup Time</span>
                    <strong>{booking.pickupTime}</strong>
                  </div>

                  <div>
                    <span>Collection Point</span>
                    <strong>{booking.collectionPoint}</strong>
                  </div>

                  <div>
                    <span>Amount</span>
                    <strong>₹{booking.amount}</strong>
                  </div>

                </div>

                <button
                  className="booking-button"
                  onClick={() => navigate("/student-dashboard")}
                >
                  Back to Dashboard
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyBookings;