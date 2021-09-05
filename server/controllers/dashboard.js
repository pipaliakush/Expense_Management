const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Source = require('../models/source');
const Category = require('../models/category');

const { validateDateRange } = require('./validators/dateRange.validator');
const { getDateFromString } = require('./queryDataParsers');

const getDateRange = (query) => {
  const { error } = validateDateRange(query);
  let { startDate, endDate } = query;

  if (!error) {
    startDate = getDateFromString(startDate);
    endDate = getDateFromString(endDate);
    endDate.setHours(23, 59, 59, 999);
  }

  return { error, startDate, endDate };
};

const getMatchCriteria = (userId, startDate, endDate) => {
  return {
    userId: mongoose.Types.ObjectId(userId),
    spentOn: {
      $gte: startDate,
      $lte: endDate,
    },
  };
};

const getFacetCriteriaForCollectionByType = (
  type,
  collectionName,
  foreignField
) => {
  return [
    { $match: { type } },
    {
      $group: {
        _id: `$${foreignField}`,
        totalAmount: { $sum: '$amount' },
      },
    },
    {
      $lookup: {
        from: collectionName,
        let: { [foreignField]: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', `$$${foreignField}`] } } },
          { $project: { _id: 0, name: 1 } },
        ],
        as: collectionName,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { $arrayElemAt: [`$${collectionName}`, 0] },
            '$$ROOT',
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
        name: 1,
      },
    },
  ];
};

const getDashboardInfo = async (req, res) => {
  const { error, startDate, endDate } = getDateRange(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userId = req.user.id;

  const getTotalAmountGroupedByDate = {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$spentOn' } },
      totalAmount: { $sum: '$amount' },
    },
  };

  const finalProjection = {
    $project: {
      _id: 0,
      spentOn: '$_id',
      totalAmount: 1,
    },
  };

  const sortBySpentOn = { $sort: { spentOn: 1 } };

  const [result = {}] = await Transaction.aggregate()
    .match(getMatchCriteria(userId, startDate, endDate))
    .facet({
      expense: [
        { $match: { type: 'expense' } },
        getTotalAmountGroupedByDate,
        finalProjection,
        sortBySpentOn,
      ],
      income: [
        { $match: { type: 'income' } },
        getTotalAmountGroupedByDate,
        finalProjection,
        sortBySpentOn,
      ],
      sourceExpanse: getFacetCriteriaForCollectionByType(
        'expense',
        'sources',
        'sourceId'
      ),
      sourceIncome: getFacetCriteriaForCollectionByType(
        'income',
        'sources',
        'sourceId'
      ),
      categoryExpense: getFacetCriteriaForCollectionByType(
        'expense',
        'categories',
        'categoryId'
      ),
      categoryIncome: getFacetCriteriaForCollectionByType(
        'income',
        'categories',
        'categoryId'
      ),
    })
    .exec();

  const sourcesCount = await Source.find({
    $or: [{ userId: userId }, { isDefault: true, userId: null }],
  }).count();

  const categoryCount = await Category.find({
    $or: [{ userId: userId }, { isDefault: true, userId: null }],
  }).count();

  result.sourcesCount = sourcesCount;
  result.categoryCount = categoryCount;

  return res.send(result);
};

const getIncomeExpenseTotalPerDate = async (req, res) => {
  const { error, startDate, endDate } = getDateRange(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const getTotalAmountGroupedByDate = {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$spentOn' } },
      totalAmount: { $sum: '$amount' },
    },
  };

  const finalProjection = {
    $project: {
      _id: 0,
      spentOn: '$_id',
      totalAmount: 1,
    },
  };

  const sortBySpentOn = { $sort: { spentOn: 1 } };

  const result = await Transaction.aggregate()
    .match(getMatchCriteria(req.user.id, startDate, endDate))
    .facet({
      expense: [
        { $match: { type: 'expense' } },
        getTotalAmountGroupedByDate,
        finalProjection,
        sortBySpentOn,
      ],
      income: [
        { $match: { type: 'income' } },
        getTotalAmountGroupedByDate,
        finalProjection,
        sortBySpentOn,
      ],
    })
    .exec();

  return res.send(result);
};

const getIncomeExpenseTotalForSourcePerDate = async (req, res) => {
  const { error, startDate, endDate } = getDateRange(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const result = await Transaction.aggregate()
    .match(getMatchCriteria(req.user.id, startDate, endDate))
    .facet({
      expense: getFacetCriteriaForCollectionByType(
        'expense',
        'sources',
        'sourceId'
      ),
      income: getFacetCriteriaForCollectionByType(
        'income',
        'sources',
        'sourceId'
      ),
    })
    .exec();

  return res.send(result);
};

const getIncomeExpenseTotalForCategoryPerDate = async (req, res) => {
  const { error, startDate, endDate } = getDateRange(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const result = await Transaction.aggregate()
    .match(getMatchCriteria(req.user.id, startDate, endDate))
    .facet({
      expense: getFacetCriteriaForCollectionByType(
        'expense',
        'categories',
        'categoryId'
      ),
      income: getFacetCriteriaForCollectionByType(
        'income',
        'categories',
        'categoryId'
      ),
    })
    .exec();

  return res.send(result);
};

module.exports = {
  getIncomeExpenseTotalPerDate,
  getIncomeExpenseTotalForSourcePerDate,
  getIncomeExpenseTotalForCategoryPerDate,
  getDashboardInfo,
};
