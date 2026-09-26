const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

// Create complaint
router.post("/", async (req, res) => {
  try {
    const {
      studentId,
      bookingId,
      complaint,
    } = req.body;

    if (!studentId || !bookingId || !complaint) {
      return res.status(400).json({
        message: "All complaint fields are required.",
      });
    }

    const newComplaint = new Complaint({
      studentId,
      bookingId,
      complaint,
    });

    const savedComplaint =
      await newComplaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaint: savedComplaint,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Complaint submission failed.",
      error: error.message,
    });
  }
});

// Get complaints for student
router.get(
  "/student/:studentId",
  async (req, res) => {
    try {
      const complaints =
        await Complaint.find({
          studentId: req.params.studentId,
        }).sort({ createdAt: -1 });

      res.status(200).json({
        complaints,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to load complaints.",
      });
    }
  }
);

module.exports = router;