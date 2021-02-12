const { getIncomes } = require("../controllers/income");
const express = require("express");
const router = express.Router();

router.get("/income", getIncomes);

module.exports = router;
