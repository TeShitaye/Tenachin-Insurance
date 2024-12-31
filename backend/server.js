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


// POST Regular Claim
app.post('/claims', async (req, res) => {
  const { hospital, service, paymentMethod } = req.body;

  if (!hospital || !service || !paymentMethod) {
    return res.status(400).json({ message: 'All fields (hospital, service, payment method) are required' });
  }

  try {
    const newClaim = new Claim({
      hospital,
      service,
      paymentMethod,
      userType: 'regular',
    });

    await newClaim.save();
    res.status(201).json({ message: 'Regular claim submitted successfully!' });
  } catch (err) {
    console.error('Error submitting regular claim:', err);
    res.status(500).json({ message: 'Failed to submit the claim' });
  }
});

// POST Premium Claim
app.post('/premiumclaims', async (req, res) => {
  const { hospital, policy, paymentMethod, description, priority } = req.body;

  if (!hospital || !policy || !paymentMethod || !description) {
    return res.status(400).json({ message: 'All fields are required for premium claims' });
  }

  try {
    const newClaim = new Claim({
      hospital,
      policy,
      paymentMethod,
      description,
      status: 'Pending',
      userType: 'premium',
      priority,
    });

    await newClaim.save();
    res.status(201).json({ message: 'Premium claim submitted successfully' });
  } catch (err) {
    console.error('Error submitting premium claim:', err);
    res.status(500).json({ message: 'Failed to submit the claim request. Please try again.' });
  }
});

// GET Regular Claims
app.get('/claims', async (req, res) => {
  try {
    const claims = await Claim.find({ userType: 'regular' });
    console.log("Fetched Regular Claims:", claims);
    res.status(200).json(claims);
  } catch (err) {
    console.error("Error fetching regular claims:", err);
    res.status(500).json({ message: 'Failed to fetch regular claims' });
  }
});

// GET Premium Claims
app.get('/premiumclaims', verifyToken, async (req, res) => {
  try {
    const claims = await Claim.find({ userType: 'premium' });
    res.status(200).json(claims);
  } catch (err) {
    console.error('Error fetching premium claims:', err);
    res.status(500).json({ message: 'Failed to fetch premium claims' });
  }
});

// PUT for Updating Claim Status
app.put('/claims/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided' });
  }

  try {
    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    if (claim.status === 'Pending') {
      claim.status = status;
      await claim.save();
      res.json({ message: `Claim ${status.toLowerCase()}d successfully!` });
    } else {
      res.status(400).json({ message: 'Claim status cannot be changed once it is not Pending' });
    }
  } catch (err) {
    console.error('Error updating claim:', err);
    res.status(500).json({ message: 'Failed to update claim' });
  }
});


app.get('/claims', verifyToken, async (req, res) => {
  try {
    const claims = await Claim.find({ userType: 'regular' });
    res.status(200).json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ message: 'Failed to fetch regular claims' });
  }
});

app.get('/premiumclaims', verifyToken, async (req, res) => {
  try {
    const premiumClaims = await Claim.find({ userType: 'premium' });
    res.status(200).json(premiumClaims);
  } catch (err) {
    console.error('Error fetching premium claims:', err);
    res.status(500).json({ message: 'Failed to fetch premium claims' });
  }
});


let options = {
  hospitals: [],
  services: [],
  paymentMethods: [],
};

// Endpoint to fetch all options
app.get("/options", (req, res) => {
  res.json(options);
});

// Endpoint to add a new option
app.post("/options", (req, res) => {
  const { type, name } = req.body;

  if (!type || !name || !options[type]) {
    return res.status(400).json({ message: "Invalid option type or name." });
  }

  const newOption = { id: Date.now(), name };
  options[type].push(newOption);

  // Notify all connected clients
  io.emit("optionsUpdated", { type, option: newOption });

  res.json(newOption);
});

// Endpoint to delete an option
app.delete("/options/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let deleted = false;

  for (const type in options) {
    options[type] = options[type].filter((item) => {
      if (item.id === id) {
        deleted = true;
        return false;
      }
      return true;
    });
  }

  if (deleted) {
    io.emit("optionsUpdated", null); // Notify clients to refetch
    res.status(200).send();
  } else {
    res.status(404).json({ message: "Option not found." });
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
  console.log(`Server running on http://localhost:${PORT}`);
});