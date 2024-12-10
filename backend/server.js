import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "your_secret_key"; // Replace with your secret key

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ Status: "Error", Error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id; // Attach the decoded user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ Status: "Error", Error: "Invalid token." });
  }
};

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  region: { type: String, required: true },
  zone: { type: String, required: true },
  woreda: { type: String, required: true },
  kebele: { type: String, required: true },
  password: { type: String, required: true }
});

// User Model
const User = mongoose.model('User', userSchema);

// Routes

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
      console.log("Received register data:", req.body);
      const { username, email, phone, age, region, zone, woreda, kebele, password } = req.body;

      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ Status: "Error", Error: "Email already registered" });
      }
      // Save new user
      const newUser = new User({ username, email, phone, age, region, zone, woreda, kebele, password });
      await newUser.save();
      res.status(201).json({ Status: "Success", Message: "Registered successfully" });
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ Status: "Error", Error: "Server error during registration" });
  }
});

app.post('/login', async (req, res) => {
  try {
    console.log("Received login data:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ Status: "Error", Error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      Status: "Success",
      Message: "Login successful",
      Token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ Status: "Error", Error: "Server error during login" });
  }
});
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }

    // Mock claims and services for this example
    const claims = [
      { service: "Health Insurance", status: "approved" },
      { service: "Dental Insurance", status: "pending" },
    ];
    const services = ["Health Checkup", "Emergency Coverage"];

    res.status(200).json({
      user,
      claims,
      services,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ Status: "Error", Error: "Server error fetching profile" });
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
