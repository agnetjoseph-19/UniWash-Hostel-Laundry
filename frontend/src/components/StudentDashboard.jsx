import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <h1>Welcome to UniWash 👋</h1>

        <p className="dashboard-subtitle">
          Manage your laundry easily from one place.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <div className="dashboard-icon">🧺</div>

            <h3>Book Laundry</h3>

            <p>
              Choose a laundry service and schedule your booking.
            </p>

            <button
              onClick={() => navigate("/book-laundry")}
            >
              Book Now
            </button>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">📋</div>

            <h3>My Bookings</h3>

            <p>
              View your current and previous laundry bookings.
            </p>

            <button
              onClick={() => navigate("/my-bookings")}
            >
              View Bookings
            </button>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">🚚</div>

            <h3>Laundry Status</h3>

            <p>
              Track the current status of your laundry.
            </p>

            <button
              onClick={() => navigate("/laundry-status")}
            >
              Track Laundry
            </button>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">💬</div>

            <h3>Complaints</h3>

            <p>
              Submit and track your laundry complaints.
            </p>

            <button
              onClick={() => navigate("/complaints")}
            >
              View Complaints
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;