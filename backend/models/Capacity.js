const mongoose = require("mongoose");

const capacitySchema = new mongoose.Schema(
  {
    collectionPoint: {
      type: String,
      enum: [
        "Girls Hostel",
        "PG Boys Hostel",
        "College Store",
      ],
      required: true,
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

    maxCapacity: {
      type: Number,
      required: true,
      default: 20,
    },

    currentBookings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Capacity", capacitySchema);