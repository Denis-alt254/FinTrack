const express = require("express");
const protect = require("../middleware/AuthMiddleware");
const { SetBudget, CheckBudgetUsage } = require("../controllers/BudgetController");
const router = express.Router();

router.post('/', protect, SetBudget);
router.get('/', protect, CheckBudgetUsage);

module.exports = router;