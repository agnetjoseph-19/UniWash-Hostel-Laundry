const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("UniWash Backend is running!");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/uniwash")
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error
    );
  });

// Start server
app.listen(PORT, () => {
  console.log(
    `UniWash server running on http://localhost:${PORT}`
  );
});