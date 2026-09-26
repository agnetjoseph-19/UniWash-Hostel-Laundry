import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookLaundry() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [slot, setSlot] = useState("");
  const [collectionPoint, setCollectionPoint] = useState("");
  const [remainingSlots, setRemainingSlots] = useState(null);

  const services = {
    "Washing Only": 40,
    "Washing + Drying": 60,
    "Washing + Drying + Ironing": 80,
    "Washing + Starch + Drying + Ironing": 100,
    "Ironing Only": 20,
  };

  const totalAmount = service
    ? services[service] * quantity
    : 0;

  // Check available capacity
  useEffect(() => {
    const checkCapacity = async () => {
      if (!bookingDate || !slot || !collectionPoint) {
        setRemainingSlots(null);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/capacity?bookingDate=${encodeURIComponent(
            bookingDate
          )}&slot=${encodeURIComponent(
            slot
          )}&collectionPoint=${encodeURIComponent(
            collectionPoint
          )}`
        );

        const data = await response.json();

        if (response.ok) {
          setRemainingSlots(data.remainingSlots);
        } else {
          setRemainingSlots(null);
        }
      } catch (error) {
        console.error(error);
        setRemainingSlots(null);
      }
    };

    checkCapacity();
  }, [bookingDate, slot, collectionPoint]);

  const handleContinue = async (e) => {
    e.preventDefault();

    if (
      !service ||
      !quantity ||
      !bookingDate ||
      !slot ||
      !collectionPoint
    ) {
      alert("Please fill in all booking details.");
      return;
    }

    const selectedDate = new Date(
      bookingDate + "T00:00:00"
    );

    const day = selectedDate.getDay();

    if (![1, 3, 5].includes(day)) {
      alert(
        "Please select a Monday, Wednesday, or Friday."
      );
      return;
    }

    if (
      remainingSlots !== null &&
      remainingSlots <= 0
    ) {
      alert(
        "Sorry, this pickup slot is full. Please choose another slot."
      );
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("uniwashUser")
    );

    if (!user || !user.id) {
      alert("Please login before creating a booking.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId: user.id,
            service,
            quantity,
            totalAmount,
            bookingDate,
            slot,
            collectionPoint,
            paymentStatus: "Pending",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            data.message ||
            "Booking creation failed."
        );
        return;
      }

      alert("Booking created successfully! 🎉");

      navigate("/booking-summary", {
        state: {
          bookingId: data.booking._id,
          service: data.booking.service,
          quantity: data.booking.quantity,
          bookingDate: data.booking.bookingDate,
          slot: data.booking.slot,
          collectionPoint: data.booking.collectionPoint,
          totalAmount: data.booking.totalAmount,
          paymentStatus: data.booking.paymentStatus,
        },
      });
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to the UniWash backend. Make sure the backend is running."
      );
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">

        <h1>Book Your Laundry 🧺</h1>

        <p className="booking-subtitle">
          Choose your service and pickup details.
        </p>

        <form
          className="booking-card"
          onSubmit={handleContinue}
        >

          <label>Choose Laundry Service</label>

          <select
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
          >
            <option value="">
              Select a service
            </option>

            {Object.keys(services).map((item) => (
              <option
                key={item}
                value={item}
              >
                {item} - ₹{services[item]}/kg
              </option>
            ))}
          </select>

          <label>Quantity (kg)</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />

          <label>Pickup Date</label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
          />

          <small>
            Laundry service is available on Monday,
            Wednesday, and Friday.
          </small>

          <label>Pickup Time</label>

          <select
            value={slot}
            onChange={(e) =>
              setSlot(e.target.value)
            }
          >
            <option value="">
              Select pickup session
            </option>

            <option value="7:00 AM - 8:00 AM">
              7:00 AM - 8:00 AM
            </option>

            <option value="3:30 PM - 4:30 PM">
              3:30 PM - 4:30 PM
            </option>
          </select>

          <label>Collection Point</label>

          <select
            value={collectionPoint}
            onChange={(e) =>
              setCollectionPoint(e.target.value)
            }
          >
            <option value="">
              Select collection point
            </option>

            <option value="Girls Hostel">
              Girls Hostel
            </option>

            <option value="PG Boys Hostel">
              PG Boys Hostel
            </option>

            <option value="College Store">
              College Store
            </option>
          </select>

          {remainingSlots !== null && (
            <div className="capacity-info">
              <strong>
                {remainingSlots === 0
                  ? "This pickup slot is full"
                  : `${remainingSlots} slots remaining`}
              </strong>
            </div>
          )}

          <div className="booking-total">
            <span>Total Amount</span>

            <strong>
              ₹{totalAmount}
            </strong>
          </div>

          <button
            type="submit"
            className="booking-button"
          >
            Continue Booking
          </button>

        </form>

      </div>
    </div>
  );
}

export default BookLaundry;