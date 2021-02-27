const Transaction = require('../models/transaction');
const validateObjectId = require('./validators/objectId.validator');
const validateTransaction = require('./validators/transaction.validator');

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id });
  res.send(transactions);
};

const getTransactionById = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).send('The Transaction does not exist');
  }

  return res.send(transaction);
};

const createTransaction = async (req, res) => {
  const transactionData = req.body;
  transactionData.userId = req.user.id;
  const { error } = validateTransaction(transactionData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transaction = await Transaction.create({
    userId: req.user.id,
    type: transactionData.type,
    sourceId: transactionData.sourceId,
    title: transactionData.title,
    amount: transactionData.amount,
    spentOn: transactionData.spentOn,
    categoryId: transactionData.categoryId,
    note: transactionData.note,
    image: transactionData.image,
  });

  return res.send(transaction);
};

const updateTransaction = async (req, res) => {
  const transactionData = req.body;
  transactionData.userId = req.user.id;
  const { error } = validateTransaction(transactionData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    {
      userId: req.user.id,
      type: transactionData.type,
      sourceId: transactionData.sourceId,
      title: transactionData.title,
      amount: transactionData.amount,
      spentOn: transactionData.spentOn,
      categoryId: transactionData.categoryId,
      note: transactionData.note,
      image: transactionData.image,
      updatedOn: new Date(),
    },
    { new: true }
  );

  if (!transaction) {
    return res
      .status(404)
      .send('The Transaction to be updated does not exist.');
  }

  return res.send(transaction);
};

const deleteTransaction = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    return res
      .status(404)
      .send('The Transaction to be deleted does not exist.');
  }

  return res.send(transaction);
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
