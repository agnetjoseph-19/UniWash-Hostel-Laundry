const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Student Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, studentId, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !studentId || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Check if student ID already exists
    const existingStudent = await User.findOne({ studentId });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student ID already registered"
      });
    }

    // Hash the password before storing it
const hashedPassword = await bcrypt.hash(password, 10);

// Create new student
const newUser = new User({
  name,
  email,
  studentId,
  password: hashedPassword
});

    await newUser.save();

    res.status(201).json({
      message: "Student registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});
// Student Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

module.exports = router;