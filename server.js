const express      = require('express');
const cors         = require('cors');
const connectDB    = require('./db');
const transactions = require('./routes/transactions');
const auth         = require('./routes/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth',         auth);
app.use('/api/transactions', transactions);

app.get('/', (req, res) => {
  res.json({ message: 'Budget Tracker API running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));