const express = require('express');
const { GetAllExpense, AddExpense, EditExpense, DeleteExpense } = require('../controllers/ExpenseController');
const protect = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/', protect, GetAllExpense);
router.post('/', protect, AddExpense);
router.put('/:id', protect, EditExpense);
router.delete('/:id', DeleteExpense);

module.exports = router;