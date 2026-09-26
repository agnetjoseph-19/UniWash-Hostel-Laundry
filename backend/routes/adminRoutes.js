const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Complaint = require("../models/Complaint");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalBookings = await Booking.countDocuments();

    const activeBookings = await Booking.countDocuments({
      status: {
        $nin: ["Completed", "Cancelled", "Delivered"],
      },
    });

    const totalComplaints = await Complaint.countDocuments();

    res.status(200).json({
      totalStudents,
      totalBookings,
      activeBookings,
      totalComplaints,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load admin statistics.",
    });
  }
});

module.exports = router;