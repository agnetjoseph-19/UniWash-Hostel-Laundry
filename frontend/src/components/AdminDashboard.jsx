import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">

      <div className="admin-container">

        <h1>Admin Dashboard 👨‍💼</h1>

        <p className="admin-subtitle">
          Manage UniWash laundry operations from one place.
        </p>

        <div className="admin-stats">

          <div className="admin-stat-card">
            <span>👥</span>
            <h3>120</h3>
            <p>Total Students</p>
          </div>

          <div className="admin-stat-card">
            <span>📋</span>
            <h3>35</h3>
            <p>Active Bookings</p>
          </div>

          <div className="admin-stat-card">
            <span>🚚</span>
            <h3>18</h3>
            <p>In Progress</p>
          </div>

          <div className="admin-stat-card">
            <span>💬</span>
            <h3>5</h3>
            <p>Pending Complaints</p>
          </div>

        </div>

        <div className="admin-grid">

          <div className="admin-card">
            <div className="admin-icon">📋</div>

            <h3>Manage Bookings</h3>

            <p>
              View student laundry bookings and manage their status.
            </p>

            <button>
              View Bookings
            </button>
          </div>

          <div className="admin-card">
            <div className="admin-icon">👥</div>

            <h3>Manage Students</h3>

            <p>
              View registered students and their account information.
            </p>

            <button>
              View Students
            </button>
          </div>

          <div className="admin-card">
            <div className="admin-icon">🚚</div>

            <h3>Laundry Status</h3>

            <p>
              Update the status of student laundry orders.
            </p>

            <button>
              Update Status
            </button>
          </div>

          <div className="admin-card">
            <div className="admin-icon">💬</div>

            <h3>Complaints</h3>

            <p>
              Review and manage student complaints.
            </p>

            <button>
              Manage Complaints
            </button>
          </div>

        </div>

        <button
          className="admin-back-button"
          onClick={() => navigate("/student-dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default AdminDashboard;