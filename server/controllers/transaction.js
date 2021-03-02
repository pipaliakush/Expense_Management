const Transaction = require('../models/transaction');
const validateObjectId = require('./validators/objectId.validator');
const {
  validateTransaction,
  validateTransactionQueryParams,
} = require('./validators/transaction.validator');

const getTransactions = async (req, res) => {
  const { error } = validateTransactionQueryParams(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { startDate, endDate, filterBy } = req.query;
  const whereConditions = {
    userId: req.user.id,
  };

  if (filterBy && filterBy !== 'all') {
    whereConditions.type = filterBy;
  }

  if (startDate) {
    const parts = startDate.split('-');
    startDate = new Date(parts[2], parts[1] - 1, parts[0]);

    whereConditions.spentOn = {
      $gte: startDate.toISOString(),
    };
  }

  if (endDate) {
    const parts = endDate.split('-');
    endDate = new Date(parts[2], parts[1] - 1, parts[0], 23, 59, 59, 999);

    if (!whereConditions.spentOn) whereConditions.spentOn = {};
    whereConditions.spentOn.$lte = endDate.toISOString();
  }

  const transactions = await Transaction.find(whereConditions)
    .sort({ spentOn: -1 })
    .populate('sourceId')
    .populate('categoryId');

  return res.send(transactions || []);
};

const getTransactionById = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transaction = await Transaction.findById(req.params.id)
    .populate('sourceId')
    .populate('categoryId');
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
