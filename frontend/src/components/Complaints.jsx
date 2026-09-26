import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Complaints() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("uniwashUser")
    );

    if (!user || !user.id) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const bookingResponse = await fetch(
          `http://localhost:5000/api/bookings/student/${user.id}`
        );

        const bookingData =
          await bookingResponse.json();

        setBookings(bookingData.bookings || []);

        const complaintResponse = await fetch(
          `http://localhost:5000/api/complaints/student/${user.id}`
        );

        const complaintData =
          await complaintResponse.json();

        setComplaints(
          complaintData.complaints || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("uniwashUser")
    );

    if (!bookingId || !complaint) {
      alert("Please select a booking and enter a complaint.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.id,
            bookingId: bookingId,
            complaint: complaint,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Complaint failed.");
        return;
      }

      alert("Complaint submitted successfully! 🎉");

      setComplaints([
        data.complaint,
        ...complaints,
      ]);

      setBookingId("");
      setComplaint("");
    } catch (error) {
      console.log(error);
      alert("Backend connection failed.");
    }
  };

  return (
    <div className="booking-page">

      <div className="booking-container">

        <h1>Complaints 💬</h1>

        <p className="booking-subtitle">
          Submit and track your laundry complaints.
        </p>

        <div className="booking-card">

          <h2>Submit a Complaint</h2>

          <form onSubmit={handleSubmit}>

            <label>Select Booking</label>

            <select
              value={bookingId}
              onChange={(e) =>
                setBookingId(e.target.value)
              }
            >
              <option value="">
                Select a booking
              </option>

              {bookings.map((booking) => (
                <option
                  key={booking._id}
                  value={booking._id}
                >
                  {booking.service} - ₹
                  {booking.totalAmount}
                </option>
              ))}
            </select>

            <label>Complaint</label>

            <textarea
              value={complaint}
              onChange={(e) =>
                setComplaint(e.target.value)
              }
              placeholder="Enter your complaint..."
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

        <h2>Complaint History</h2>

        {complaints.length === 0 ? (
          <div className="booking-card">
            <p>No complaints submitted yet.</p>
          </div>
        ) : (
          complaints.map((item) => (
            <div
              className="booking-card"
              key={item._id}
            >

              <p>
                <strong>Complaint:</strong>{" "}
                {item.complaint}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  item.createdAt
                ).toLocaleDateString("en-IN")}
              </p>

            </div>
          ))
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

export default Complaints;