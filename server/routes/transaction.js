const express = require("express");
const router = express.Router();
const {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} = require("../controllers/transaction");

router.get("/transactions", getTransactions);

router.get("/transaction/:id", getTransactionById);

router.post("/transaction", createTransaction);

router.put("/transaction/:id", updateTransaction);

router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
