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

    bookingDate: {
      type: Date,
      required: true,
    },

    slot: {
      type: String,
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

    deliveryDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);