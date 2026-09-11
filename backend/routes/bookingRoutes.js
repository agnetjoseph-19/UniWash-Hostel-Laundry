const express = require("express");
const Booking = require("../models/Booking");
const Capacity = require("../models/Capacity");

const router = express.Router();

// Test booking route
router.get("/test", (req, res) => {
  res.json({
    message: "Booking route is working!",
  });
});

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const bookingDate = new Date(req.body.bookingDate);

if (isNaN(bookingDate.getTime())) {
  return res.status(400).json({
    message: "Booking creation failed",
    error: "Invalid booking date.",
  });
}
if (bookingDate < new Date()) {
  return res.status(400).json({
    message: "Booking creation failed",
    error: "Booking date cannot be in the past.",
  });
}
const day = bookingDate.getDay();

    // UniWash services are available only on Monday, Wednesday, and Friday
    if (![1, 3, 5].includes(day)) {
      return res.status(400).json({
        message: "Booking creation failed",
        error: "Bookings are allowed only on Monday, Wednesday, and Friday.",
      });
    }


    const allowedSlots = [
  "7:00 AM - 9:00 AM",
];

if (!allowedSlots.includes(req.body.slot)) {
  return res.status(400).json({
    message: "Booking creation failed",
    error: "Invalid pickup slot. Pickup is available only from 7:00 AM to 9:00 AM.",
  });
}

const capacity = await Capacity.findOne({
  collectionPoint: req.body.collectionPoint,
  bookingDate: req.body.bookingDate,
});

if (capacity && capacity.currentBookings >= capacity.maxCapacity) {
  return res.status(400).json({
    message: "Booking creation failed",
    error: "This collection point is full for the selected date.",
  });
}
    const booking = new Booking(req.body);

    const savedBooking = await booking.save();
    if (capacity) {
  capacity.currentBookings += 1;
  await capacity.save();
}

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: "Booking creation failed",
      error: error.message,
    });
  }
});

module.exports = router;