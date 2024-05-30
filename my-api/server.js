const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Bring in the routes
const songRoutes = require("./routes/songRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Async function to connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Exit the process with an error code
  }
}

// Call the async function to connect to the database
connectToDatabase();

// Add middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Song API!');
});

// Associate the songRoutes with the /api endpoint
app.use("/api", songRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
