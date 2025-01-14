import mongoose from 'mongoose';

// MongoDB Atlas connection string
const mongoURI = "mongodb+srv://tekustack:41209279@cluster0.cgzbkxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectDB;
