const express = require('express');
const { GetAllExpense, AddExpense, EditExpense, DeleteExpense, FilterExpense } = require('../controllers/ExpenseController');
const protect = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/', protect, GetAllExpense);
router.post('/', protect, AddExpense);
router.put('/:id', protect, EditExpense);
router.delete('/:id', protect, DeleteExpense);
router.post('/filter', protect, FilterExpense);

module.exports = router;