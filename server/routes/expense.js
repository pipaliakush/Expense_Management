const { getExpenses } = require("../controllers/expense");
const express = require("express");
const router = express.Router();

router.get("/expense", getExpenses);

module.exports = router;
