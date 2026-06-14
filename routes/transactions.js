const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const authMiddleware = require('../middleware/auth');

const TransactionSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, required: true },
  type:        { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String },
  amount:      { type: Number, required: true },
  date:        { type: String, required: true }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

// GET all transactions for logged in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add transaction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: req.user.id });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE transaction
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;