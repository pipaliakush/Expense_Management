const mongoose = require('mongoose');
const TransactionsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  sourceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Sources',
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: true,
  },
  spentOn: {
    type: Date,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  note: {
    type: String,
    maxlength: 300,
  },
  image: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
