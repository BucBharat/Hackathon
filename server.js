// Import necessary libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/PlivoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize database connection and handle connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

// Define the User schema for Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // This will store the hashed password
  // ... other fields ...
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Set the number of rounds for bcrypt salting
const SALT_ROUNDS = 10;

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user instance and save to the database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Send success response
    res.status(200).send({ message: 'User registered successfully!' });
  } catch (error) {
    // Handle and send errors
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Compare the given password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Send success response
  res.json({ message: 'Logged in successfully' });
});

// Start the Express server on the given port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
