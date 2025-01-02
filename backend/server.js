import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const SECRET_KEY = "your_secret_key"; // Replace with your secret key


// Example middleware for verifying token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ Status: "Error", Error: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id; // Attach userId to request object
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    return res.status(400).json({ Status: "Error", Error: "Invalid token." });
  }
};
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false }, // Add isPremium
  claims: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Claim' }]
});
const User = mongoose.model('User', userSchema);


// PremiumUser Schema (Separate Table for Premium Users)
const premiumUserSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Full Name
  email: { type: String, required: true, unique: true },
  phone:{type:String,required:true,unique:true},
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: true }, // Premium Flag
});

const PremiumUser = mongoose.model('PremiumUser', premiumUserSchema);
async function hashExistingPasswords() {
  const users = await User.find();
  
  for (const user of users) {
    if (!user.password.startsWith('$2b$')) { // Check if password is already hashed
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      await user.save();
      console.log(`Updated password for user: ${user.email}`);
    }
  }
}

hashExistingPasswords().catch(console.error);
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
const OptionSchema = new mongoose.Schema({
  type: String, // e.g., hospitals, services, paymentMethods
  name: String,
});

const Options = mongoose.model("Options", OptionSchema);

// Claim Schema
const claimSchema = new mongoose.Schema({
  hospital: { type: String, required: true },
  service: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  description: { type: String, required: function() { return this.userType === 'premium'; }},
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  userType: { type: String, enum: ['regular', 'premium'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  policy: { type: String, required: function() { return this.userType === 'premium'; }}
});

const Claim = mongoose.model('Claim', claimSchema);


app.post('/premium-register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    
    // Check if email already exists
    const existingUser = await PremiumUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Premium User
    const newUser = new PremiumUser({ username, email,phone, password: hashedPassword });
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


app.post('/register', async (req, res) => {
  const { username, email, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ Status: "Error", Error: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ Status: "Error", Error: "Email already registered" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    phone,
    password: hashedPassword, // Store hashed password
  });

  await newUser.save();
  res.status(201).json({ Status: "Success", Message: "Registered successfully" });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user
  let user = await User.findOne({ email }) || await PremiumUser.findOne({ email });
  if (!user) {
    console.log("User not found for email:", email);
    return res.status(404).json({ Status: "Error", Error: "User not found" });
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("User found:", user);
  console.log("Password match:", isMatch);
  
  if (!isMatch) {
    return res.status(400).json({ Status: "Error", Error: "Invalid password" });
  }

  // Generate token
  const token = jwt.sign({ id: user._id, isPremium: user.isPremium }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({
    Status: "Success",
    Token: token,
    isPremium: user.isPremium
  });
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

// POST Claim (Unified for Regular and Premium)
app.post("/claims", verifyToken, async (req, res) => {
  const { hospital, service, policy, paymentMethod, description, priority = false } = req.body;

  // Validation
  if (!hospital || !paymentMethod || (!service && !policy)) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    const claimData = {
      userId: req.user.id,
      hospital,
      paymentMethod,
      description,
      premium: priority,
      service: service || null,
      policy: policy || null,
      status: "Pending", // Default status
    };

    const newClaim = new Claim(claimData);
    await newClaim.save();

    res.status(201).json({ message: "Claim submitted successfully!" });
  } catch (err) {
    console.error("Error submitting claim:", err);
    res.status(500).json({ message: "Failed to submit the claim." });
  }
});

// GET Claims for Users (Self-View)
app.get("/claims", verifyToken, async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user.id });
    res.status(200).json(claims);
  } catch (err) {
    console.error("Error fetching user claims:", err);
    res.status(500).json({ message: "Failed to fetch claims." });
  }
});

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized as an admin" });
    }

    req.user = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Admin route to get all claims
app.get("/admin/claims", verifyAdmin, async (req, res) => {
  try {
    const claims = await Claim.find({});
    res.status(200).json(claims);
  } catch (err) {
    console.error("Error fetching all claims:", err);
    res.status(500).json({ message: "Failed to fetch claims." });
  }
});


// PUT Update Claim Status (Admin Only)
app.put("/claims/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status provided." });
  }

  try {
    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    if (claim.status === "Pending") {
      claim.status = status;
      await claim.save();
      res.json({ message: `Claim ${status.toLowerCase()} successfully!` });
    } else {
      res.status(400).json({ message: "Claim status cannot be changed from its current state." });
    }
  } catch (err) {
    console.error("Error updating claim:", err);
    res.status(500).json({ message: "Failed to update claim." });
  }
});


// Consolidated route to fetch all users (regular and premium)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get('/premiumusers', async (req, res) => {
  try {
    const premiumUsers = await PremiumUser.find().select('-password');
    res.status(200).json(premiumUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching premium users" });
  }
});

// Consolidated route to delete a user
app.delete('/users/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// DELETE route to remove an option (admin)
app.delete("/options/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Option.findByIdAndDelete(id);
    res.status(200).json({ message: "Option removed successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error removing option." });
  }
});

// POST to add options
app.post("/options", async (req, res) => {
  console.log("POST request to /options", req.body); // Log request body
  try {
    const newOption = new Options(req.body);
    await newOption.save();
    res.status(201).send(newOption);
  } catch (error) {
    console.error("Error in POST /options", error.message);
    res.status(500).send({ error: error.message });
  }
});

// GET to retrieve options
app.get("/options", async (req, res) => {
  console.log("GET request to /options"); // Log when this is called
  try {
    const options = await Options.find();
    console.log("Fetched options:", options); // Log fetched data
    res.status(200).json(options);
  } catch (error) {
    console.error("Error in GET /options", error.message);
    res.status(500).send({ error: error.message });
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



app.post("/claim-request", verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the token
    const { hospital, service, paymentMethod, description } = req.body;

    if (!hospital || !service || !paymentMethod) {
      return res.status(400).json({ Status: "Error", Error: "All fields are required." });
    }

    const newClaim = new Claim({
      hospital,
      service,
      paymentMethod,
      description,
      userType: "regular", // Adjust logic if needed
    });

    await newClaim.save();

    res.status(200).json({ Status: "Success", Message: "Claim request sent successfully." });
  } catch (error) {
    console.error("Error processing claim request:", error);
    res.status(500).json({ Status: "Error", Error: "Server error while processing claim request." });
  }
});
// Service Schema
const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "PremiumUser", required: true },
  serviceName: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "active" }, // Example: active, inactive
  createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model("Service", serviceSchema);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
}); 