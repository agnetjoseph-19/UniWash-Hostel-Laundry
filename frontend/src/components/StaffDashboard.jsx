import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    {
      id: "UW1001",
      student: "Student 1",
      service: "Washing + Drying + Ironing",
      quantity: 3,
      pickupPoint: "Girls Hostel",
      status: "Washing",
    },
    {
      id: "UW1002",
      student: "Student 2",
      service: "Washing Only",
      quantity: 2,
      pickupPoint: "College Store",
      status: "Pickup",
    },
    {
      id: "UW1003",
      student: "Student 3",
      service: "Ironing Only",
      quantity: 4,
      pickupPoint: "PG Boys Hostel",
      status: "Ready",
    },
  ]);

  const statuses = [
    "Pickup",
    "Washing",
    "Drying",
    "Ironing",
    "Ready",
    "Delivered",
  ];

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="staff-page">

      <div className="staff-container">

        <h1>Laundry Staff Dashboard 👕</h1>

        <p className="staff-subtitle">
          Manage assigned laundry orders and update their status.
        </p>

        <div className="staff-stats">

          <div className="staff-stat-card">
            <span>📋</span>
            <h3>{orders.length}</h3>
            <p>Assigned Orders</p>
          </div>

          <div className="staff-stat-card">
            <span>🫧</span>
            <h3>
              {
                orders.filter(
                  (order) => order.status === "Washing"
                ).length
              }
            </h3>
            <p>Washing</p>
          </div>

          <div className="staff-stat-card">
            <span>✨</span>
            <h3>
              {
                orders.filter(
                  (order) => order.status === "Ready"
                ).length
              }
            </h3>
            <p>Ready</p>
          </div>

          <div className="staff-stat-card">
            <span>🚚</span>
            <h3>
              {
                orders.filter(
                  (order) => order.status === "Delivered"
                ).length
              }
            </h3>
            <p>Delivered</p>
          </div>

        </div>

        <div className="staff-orders">

          {orders.map((order) => (

            <div
              className="staff-order-card"
              key={order.id}
            >

              <div className="staff-order-header">

                <div>
                  <span>Booking ID</span>
                  <strong>{order.id}</strong>
                </div>

                <span className="staff-status">
                  {order.status}
                </span>

              </div>

              <div className="staff-order-details">

                <div>
                  <span>Student</span>
                  <strong>{order.student}</strong>
                </div>

                <div>
                  <span>Service</span>
                  <strong>{order.service}</strong>
                </div>

                <div>
                  <span>Quantity</span>
                  <strong>{order.quantity} kg</strong>
                </div>

                <div>
                  <span>Collection Point</span>
                  <strong>{order.pickupPoint}</strong>
                </div>

              </div>

              <div className="staff-update">

                <label>Update Status</label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
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

            </div>

          ))}

        </div>

        <button
          className="staff-back-button"
          onClick={() => navigate("/admin-dashboard")}
        >
          Back to Admin Dashboard
        </button>

      </div>

    </div>
  );
}

export default StaffDashboard;