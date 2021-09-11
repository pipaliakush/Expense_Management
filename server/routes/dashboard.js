const express = require('express');
const router = express.Router();

const {
  getIncomeExpenseTotalPerDate,
  getIncomeExpenseTotalForSourcePerDate,
  getIncomeExpenseTotalForCategoryPerDate,
  getDashboardInfo
} = require('../controllers/dashboard');

router.get('/total-per-date', getIncomeExpenseTotalPerDate);

router.get('/total-for-source', getIncomeExpenseTotalForSourcePerDate);

router.get('/total-for-category', getIncomeExpenseTotalForCategoryPerDate);

router.get('/', getDashboardInfo)

module.exports = router;
