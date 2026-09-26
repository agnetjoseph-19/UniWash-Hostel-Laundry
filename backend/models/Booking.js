const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      enum: [
        "Washing Only",
        "Washing + Drying",
        "Washing + Drying + Ironing",
        "Washing + Starch + Drying + Ironing",
        "Ironing Only",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    slot: {
      type: String,
      enum: [
        "7:00 AM - 8:00 AM",
        "3:30 PM - 4:30 PM",
      ],
      required: true,
    },

    collectionPoint: {
      type: String,
      enum: [
        "Girls Hostel",
        "PG Boys Hostel",
        "College Store",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
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
      ],
      default: "Booking Confirmed",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    deliveryDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);