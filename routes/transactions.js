const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

// Schema — same as your C++ Transaction struct
const TransactionSchema = new mongoose.Schema({
  type:        { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String },
  amount:      { type: Number, required: true },
  date:        { type: String, required: true }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;