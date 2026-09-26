const express = require("express");
const Booking = require("../models/Booking");
const Capacity = require("../models/Capacity");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Booking route is working!",
  });
});

// Check available capacity
router.get("/capacity", async (req, res) => {
  try {
    const {
      bookingDate,
      slot,
      collectionPoint,
    } = req.query;

    if (!bookingDate || !slot || !collectionPoint) {
      return res.status(400).json({
        message:
          "Date, slot and collection point are required.",
      });
    }

    const selectedDate = new Date(bookingDate);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid booking date.",
      });
    }

    selectedDate.setHours(0, 0, 0, 0);

    let capacity = await Capacity.findOne({
      collectionPoint,
      bookingDate: selectedDate,
      slot,
    });

    if (!capacity) {
      return res.status(200).json({
        maxCapacity: 20,
        currentBookings: 0,
        remainingSlots: 20,
      });
    }

    const remainingSlots =
      capacity.maxCapacity -
      capacity.currentBookings;

    res.status(200).json({
      maxCapacity: capacity.maxCapacity,
      currentBookings: capacity.currentBookings,
      remainingSlots: Math.max(
        remainingSlots,
        0
      ),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to check capacity.",
    });
  }
});

// Check delivery deadline
router.get("/:id/deadline", async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    if (!booking.deliveryDeadline) {
      return res.status(400).json({
        message:
          "Delivery deadline is not available.",
      });
    }

    const now = new Date();

    const deadline = new Date(
      booking.deliveryDeadline
    );

    const difference =
      deadline.getTime() - now.getTime();

    if (difference <= 0) {
      return res.status(200).json({
        bookingId: booking._id,
        deliveryDeadline: deadline,
        expired: true,
        hoursRemaining: 0,
        minutesRemaining: 0,
        message:
          "Delivery deadline has passed.",
      });
    }

    const totalMinutes = Math.floor(
      difference / (1000 * 60)
    );

    const hoursRemaining = Math.floor(
      totalMinutes / 60
    );

    const minutesRemaining =
      totalMinutes % 60;

    res.status(200).json({
      bookingId: booking._id,
      deliveryDeadline: deadline,
      expired: false,
      hoursRemaining,
      minutesRemaining,
      message:
        hoursRemaining <= 6
          ? "Delivery deadline is approaching!"
          : "Delivery is within the 48-hour deadline.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to check delivery deadline.",
      error: error.message,
    });
  }
});

// Create booking
router.post("/", async (req, res) => {
  try {
    const {
      studentId,
      service,
      quantity,
      bookingDate,
      slot,
      collectionPoint,
      totalAmount,
      paymentStatus,
    } = req.body;

    if (
      !studentId ||
      !service ||
      !quantity ||
      !bookingDate ||
      !slot ||
      !collectionPoint ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Booking creation failed",
        error:
          "All booking fields are required.",
      });
    }

    const selectedDate = new Date(
      bookingDate
    );

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Booking creation failed",
        error: "Invalid booking date.",
      });
    }

    // Check that booking date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(
      selectedDate
    );
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return res.status(400).json({
        message: "Booking creation failed",
        error:
          "Booking date cannot be in the past.",
      });
    }

    // Only Monday, Wednesday and Friday
    const day = selectedDate.getDay();

    if (![1, 3, 5].includes(day)) {
      return res.status(400).json({
        message: "Booking creation failed",
        error:
          "Bookings are allowed only on Monday, Wednesday, and Friday.",
      });
    }

    // Allowed pickup slots
    const allowedSlots = [
      "7:00 AM - 8:00 AM",
      "3:30 PM - 4:30 PM",
    ];

    if (!allowedSlots.includes(slot)) {
      return res.status(400).json({
        message: "Booking creation failed",
        error: "Invalid pickup slot.",
      });
    }

    // Smart capacity
    let capacity = await Capacity.findOne({
      collectionPoint,
      bookingDate: checkDate,
      slot,
    });

    if (!capacity) {
      capacity = new Capacity({
        collectionPoint,
        bookingDate: checkDate,
        slot,
        maxCapacity: 20,
        currentBookings: 0,
      });

      await capacity.save();
    }

    // Check whether this particular slot is full
    if (
      capacity.currentBookings >=
      capacity.maxCapacity
    ) {
      return res.status(400).json({
        message:
          "Booking creation failed",
        error:
          "This pickup slot is full for the selected collection point and date.",
      });
    }

    // Calculate delivery deadline
    const deliveryDeadline = new Date(
      selectedDate
    );

    if (
      slot === "7:00 AM - 8:00 AM"
    ) {
      deliveryDeadline.setHours(
        8,
        0,
        0,
        0
      );
    } else if (
      slot === "3:30 PM - 4:30 PM"
    ) {
      deliveryDeadline.setHours(
        16,
        30,
        0,
        0
      );
    }

    // Add 48 hours
    deliveryDeadline.setHours(
      deliveryDeadline.getHours() + 48
    );

    // Create booking
    const booking = new Booking({
      studentId,
      service,
      quantity,
      totalAmount,
      bookingDate: selectedDate,
      slot,
      collectionPoint,
      paymentStatus:
        paymentStatus || "Pending",
      deliveryDeadline,
    });

    const savedBooking =
      await booking.save();

    // Increase capacity count
    capacity.currentBookings += 1;

    await capacity.save();

    res.status(201).json({
      message:
        "Booking created successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message:
        "Booking creation failed",
      error: error.message,
    });
  }
});

// Mark booking as paid
router.put(
  "/:id/payment",
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      booking.paymentStatus = "Paid";

      await booking.save();

      res.status(200).json({
        message:
          "Payment successful!",
        booking,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Payment update failed",
        error: error.message,
      });
    }
  }
);

// Get student bookings
router.get(
  "/student/:studentId",
  async (req, res) => {
    try {
      const bookings =
        await Booking.find({
          studentId:
            req.params.studentId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        message:
          "Bookings retrieved successfully",
        bookings,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to retrieve bookings",
        error: error.message,
      });
    }
  }
);

// Get all bookings for staff/admin
router.get(
  "/all",
  async (req, res) => {
    try {
      const bookings =
        await Booking.find()
          .populate(
            "studentId",
            "name email studentId"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        message:
          "All bookings retrieved successfully",
        bookings,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to retrieve bookings",
        error: error.message,
      });
    }
  }
);

// Update laundry status
router.put(
  "/:id/status",
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const allowedStatuses = [
        "Booking Confirmed",
        "Clothes Collected",
        "In Processing",
        "Washing",
        "Drying",
        "Ironing",
        "Ready for Delivery",
        "Delivered",
        "Completed",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid laundry status.",
        });
      }

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found.",
        });
      }

      booking.status = status;

      await booking.save();

      res.status(200).json({
        message:
          "Laundry status updated successfully!",
        booking,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Status update failed.",
        error: error.message,
      });
    }
  }
);

module.exports = router;