import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Complaints() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const complaints = [
    {
      id: "C001",
      category: "Late Delivery",
      description: "Laundry was delivered later than expected.",
      status: "Resolved",
    },
    {
      id: "C002",
      category: "Missing Item",
      description: "One clothing item was missing from the order.",
      status: "Pending",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !description) {
      alert("Please fill in all complaint details.");
      return;
    }

    alert("Complaint submitted successfully! 💬");

    setCategory("");
    setDescription("");
  };

  return (
    <div className="complaints-page">

      <div className="complaints-container">

        <h1>Complaints 💬</h1>

        <p className="complaints-subtitle">
          Submit and track your laundry complaints.
        </p>

        {/* Complaint Form */}

        <div className="complaint-card">

          <h2>Submit a Complaint</h2>

          <form onSubmit={handleSubmit}>

            <label>Complaint Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">
                Select a category
              </option>

              <option value="Late Delivery">
                Late Delivery
              </option>

              <option value="Missing Item">
                Missing Item
              </option>

              <option value="Damaged Clothes">
                Damaged Clothes
              </option>

              <option value="Wrong Service">
                Wrong Service
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your complaint..."
              rows="5"
            />

            <button
              type="submit"
              className="booking-button"
            >
              Submit Complaint
            </button>

          </form>

        </div>

        {/* Previous Complaints */}

        <div className="previous-complaints">

          <h2>My Complaints</h2>

          {complaints.map((complaint) => (

            <div
              className="complaint-card complaint-history"
              key={complaint.id}
            >

              <div className="complaint-header">

                <div>
                  <span>Complaint ID</span>
                  <strong>{complaint.id}</strong>
                </div>

                <span
                  className={`complaint-status ${
                    complaint.status === "Resolved"
                      ? "resolved"
                      : "pending"
                  }`}
                >
                  {complaint.status}
                </span>

              </div>

              <div className="complaint-details">

                <p>
                  <strong>Category:</strong>{" "}
                  {complaint.category}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {complaint.description}
                </p>

              </div>

            </div>

          ))}

        </div>

        <button
          className="back-dashboard-button"
          onClick={() => navigate("/student-dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Complaints;