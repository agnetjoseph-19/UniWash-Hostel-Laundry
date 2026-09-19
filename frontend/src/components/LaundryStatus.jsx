import { useNavigate } from "react-router-dom";

function LaundryStatus() {
  const navigate = useNavigate();

  const currentStatus = "Washing";

  const statuses = [
    {
      name: "Booking Confirmed",
      icon: "✅",
    },
    {
      name: "Pickup",
      icon: "📦",
    },
    {
      name: "Washing",
      icon: "🫧",
    },
    {
      name: "Drying",
      icon: "🌬️",
    },
    {
      name: "Ironing",
      icon: "👔",
    },
    {
      name: "Ready",
      icon: "✨",
    },
    {
      name: "Delivered",
      icon: "🏠",
    },
  ];

  const currentIndex = statuses.findIndex(
    (status) => status.name === currentStatus
  );

  return (
    <div className="status-page">

      <div className="status-container">

        <h1>Laundry Status 🚚</h1>

        <p className="status-subtitle">
          Track your laundry from pickup to delivery.
        </p>

        <div className="status-card">

          <div className="status-booking">

            <div>
              <span>Booking ID</span>
              <strong>UW1001</strong>
            </div>

            <div>
              <span>Service</span>
              <strong>
                Washing + Drying + Ironing
              </strong>
            </div>

          </div>

          <h2>Current Status</h2>

          <div className="current-status">
            🫧 {currentStatus}
          </div>

          <div className="status-timeline">

            {statuses.map((status, index) => {

              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div
                  className={`status-step ${
                    isCompleted ? "completed" : ""
                  } ${isCurrent ? "current" : ""}`}
                  key={status.name}
                >

                  <div className="status-icon">
                    {status.icon}
                  </div>

                  <div className="status-step-content">
                    <strong>{status.name}</strong>

                    <span>
                      {isCurrent
                        ? "Laundry is currently here"
                        : index < currentIndex
                        ? "Completed"
                        : "Waiting"}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>

          <div className="delivery-info">

            <div>
              <span>Expected Delivery</span>
              <strong>Within 48 hours</strong>
            </div>

            <div>
              <span>Collection Point</span>
              <strong>Girls Hostel</strong>
            </div>

          </div>

          <button
            className="booking-button"
            onClick={() => navigate("/student-dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default LaundryStatus;