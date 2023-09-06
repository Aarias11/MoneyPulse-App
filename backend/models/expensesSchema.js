// expensesSchema.js
const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  notes: String,
  item: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure required: true if needed
});

module.exports = mongoose.model('Expenses', expensesSchema);
