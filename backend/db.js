import mongoose from 'mongoose';

// MongoDB connection string
const mongoURI = "mongodb://127.0.0.1:27017/local";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectDB;
