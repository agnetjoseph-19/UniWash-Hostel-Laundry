import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalComplaints: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/stats"
        );

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <h1>Admin Dashboard 👨‍💼</h1>

        <p className="dashboard-subtitle">
          Manage UniWash operations and monitor activities.
        </p>

        {loading ? (
          <p>Loading statistics...</p>
        ) : (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <div className="dashboard-icon">
                👨‍🎓
              </div>

              <h3>Total Students</h3>

              <p className="admin-number">
                {stats.totalStudents}
              </p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                📋
              </div>

              <h3>Total Bookings</h3>

              <p className="admin-number">
                {stats.totalBookings}
              </p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                🧺
              </div>

              <h3>Active Bookings</h3>

              <p className="admin-number">
                {stats.activeBookings}
              </p>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                💬
              </div>

              <h3>Total Complaints</h3>

              <p className="admin-number">
                {stats.totalComplaints}
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;