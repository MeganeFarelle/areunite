const express = require("express");
const miscController = require("../controllers/miscController");

const router = express.Router();

router.get("/", miscController.getDashboard);

module.exports = router;