const express = require("express");

const router = express.Router();

// Test booking route
router.get("/test", (req, res) => {
  res.json({
    message: "Booking route is working!"
  });
});

module.exports = router;