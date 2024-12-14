import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


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
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false } // Add isPremium
});
// User Model
const User = mongoose.model('User', userSchema);

// PremiumUser Schema (Separate Table for Premium Users)
const premiumUserSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Full Name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: true }, // Premium Flag
});

const PremiumUser = mongoose.model('PremiumUser', premiumUserSchema);

// Routes

// Registration Endpoint
// Registration Endpoint

app.post('/premium-register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if email already exists
    const existingUser = await PremiumUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Premium User
    const newUser = new PremiumUser({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Premium user registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering premium user" });
  }
});

// Premium User Login
app.post('/premium-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await PremiumUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});
// Backend route to get premium user profile data
app.get('/premium-profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;
    
    // Fetch user details
    const user = await PremiumUser.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch user claims and services
    const claims = await Claim.find({ userId: userId });
    const services = await Service.find({ userId: userId });

    res.status(200).json({ user, claims, services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Backend route to submit a claim
app.post('/premium-claims', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.id;

    // Create new claim
    const { fullName, email, hospital, policy, paymentMethod, description, priority } = req.body;
    const newClaim = new Claim({
      userId,
      fullName,
      email,
      hospital,
      policy,
      paymentMethod,
      description,
      priority,
      status: 'pending', // Default status is pending
    });

    await newClaim.save();
    res.status(201).json({ message: 'Claim submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting claim' });
  }
});

app.post('/register', async (req, res) => {
  try {
    console.log("Received register data:", req.body);
    const { username, email, phone, password, confirmPassword } = req.body;

    // Password match validation
    if (password !== confirmPassword) {
      return res.status(400).json({ Status: "Error", Error: "Passwords do not match" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ Status: "Error", Error: "Email already registered" });
    }

    // Save new user
    const newUser = new User({ username, email, phone, password });
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
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ Status: "Error", Error: "Server error fetching users" });
  }
});

app.delete('/users/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId); // Delete user by ID
    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }
    res.status(200).json({ Status: "Success", Message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ Status: "Error", Error: "Server error deleting user" });
  }
});

app.put('/users/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { claims, paymentMethod, status } = req.body; // Add other fields as necessary
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { claims, paymentMethod, status }, // Update user fields
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }
    res.status(200).json({ Status: "Success", Message: "User updated successfully", User: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ Status: "Error", Error: "Server error updating user" });
  }
});
app.get('/premium', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }

    if (!user.isPremium) {
      return res.status(403).json({ Status: "Error", Error: "Access denied. Not a premium user." });
    }

    res.status(200).json({ Status: "Success", Message: "Welcome to the premium section." });
  } catch (error) {
    console.error("Error fetching premium content:", error);
    res.status(500).json({ Status: "Error", Error: "Server error fetching premium content." });
  }
});

app.put('/users/upgrade', verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, { isPremium: true }, { new: true });
    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }
    res.status(200).json({ Status: "Success", Message: "Upgraded to premium successfully" });
  } catch (error) {
    console.error("Error upgrading to premium:", error);
    res.status(500).json({ Status: "Error", Error: "Server error upgrading to premium" });
  }
});


// Claim Schema
const claimSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  hospital: { type: String, required: true },
  policy: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
});


const Claim = mongoose.model("Claim", claimSchema);

app.post("/claim-request", verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }

    // Example: Add a pending claim entry
    user.claims = user.claims || [];
    user.claims.push({ service: "Generic Claim", status: "pending" }); // Modify as needed
    await user.save();

    res.status(200).json({ Status: "Success", Message: "Claim request sent successfully." });
  } catch (error) {
    console.error("Error processing claim request:", error);
    res.status(500).json({ Status: "Error", Error: "Server error while processing claim request." });
  }
});


// Endpoint to fetch claims (Admin View)
app.get("/claims", async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ Status: "Error", Error: "Server error while fetching claims." });
  }
});

// Fetch Claims with Hospital, Policy, and PaymentMethod
app.get("/claims", async (req, res) => {
  try {
    const claims = await Claim.find(); // Retrieve all claims
    res.status(200).json({ Status: "Success", Claims: claims });
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ Status: "Error", Error: "Server error while fetching claims." });
  }
});

// Update Claim Status and Propagate to User's Profile
app.put("/claims/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // New status: "approved" or "rejected"

    const updatedClaim = await Claim.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated claim
    );

    if (!updatedClaim) {
      return res.status(404).json({ Status: "Error", Error: "Claim not found" });
    }

    // Update claim in the user's profile
    const user = await User.findOne({ email: updatedClaim.email }); // Match by claim's email
    if (user) {
      const userClaims = user.claims || []; // Ensure claims array exists
      const claimIndex = userClaims.findIndex((c) => c._id.toString() === id);
      if (claimIndex !== -1) {
        userClaims[claimIndex].status = status; // Update the status in the user's claims
      } else {
        userClaims.push({
          service: updatedClaim.policy, // Example mapping: use "policy" as the service name
          status,
        });
      }
      user.claims = userClaims;
      await user.save();
    }

    res.status(200).json({ Status: "Success", Message: "Claim updated successfully", Claim: updatedClaim });
  } catch (error) {
    console.error("Error updating claim:", error);
    res.status(500).json({ Status: "Error", Error: "Server error while updating claim." });
  }
});
app.post("/claims", async (req, res) => {
  const { fullName, email, hospital, policy, paymentMethod, description } = req.body;

  if (!fullName || !email || !hospital || !policy || !paymentMethod || !description) {
    return res.status(400).json({ Status: "Error", Error: "All fields are required." });
  }

  try {
    const newClaim = new Claim({ fullName, email, hospital, policy, paymentMethod, description });
    await newClaim.save();
    res.status(201).json({ Status: "Success", Message: "Claim submitted successfully." });
  } catch (error) {
    console.error("Error saving claim:", error.message);
    res.status(500).json({ Status: "Error", Error: "Failed to save the claim." });
  }
});



// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});