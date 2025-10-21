const express = require("express");
const protect = require("../middleware/AuthMiddleware");
const { SetBudget } = require("../controllers/BudgetController");
const router = express.Router();

router.post('/', protect, SetBudget);

module.exports = router;