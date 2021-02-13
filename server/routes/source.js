const express = require("express");
const router = express.Router();

const {
  getSources,
  getSourceById,
  createSource,
  updateSource,
  deleteSource,
} = require("../controllers/source");

router.get("/", getSources);

router.get("/:id", getSourceById);

router.post("/", createSource);

router.put("/:id", updateSource);

router.delete("/:id", deleteSource);

module.exports = router;
