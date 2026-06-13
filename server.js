const express      = require('express');
const cors         = require('cors');
const connectDB    = require('./db');
const transactions = require('./routes/transactions');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactions);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Budget Tracker API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});