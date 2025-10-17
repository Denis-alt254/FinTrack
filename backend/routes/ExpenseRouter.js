const express = require('express');
const { GetAllExpense, AddExpense, EditExpense } = require('../controllers/ExpenseController');
const protect = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/', protect, GetAllExpense);
router.post('/', protect, AddExpense);
router.put('/:id', protect, EditExpense);

module.exports = router;