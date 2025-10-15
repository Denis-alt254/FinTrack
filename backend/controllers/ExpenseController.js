const Expense = require("../models/Expense");

const AddExpense = async(req, res) => {
    try {
        const {userId = req.user.userId, title, amount, category, date, notes} = req.body;
        
        if(!title || !amount || !category){
            return res.status(400).json({error: "title, amount and category required."});
        }

        const newExpense = new Expense({
            userId, title, amount, category, date, notes
        })

        const savedExpense = newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error("Error adding an expense ", error);
        res.status(500).json({error: error.message});
    }
}

const EditExpense = async(req, res) => {
    try {
        const userId = req.user.userId;
        const expense = await Expense.findByIdAndUpdate({userId});
        if(!expense){
            return res.status(404).json("Expense not found.")
        }
        const {title, amount, category, date, notes} = req.body;
        const updatedExpense = expense({title, amount, category, date, notes});
        const savedExpense = await updatedExpense.save();
        res.status(200).json(savedExpense);
    } catch (error) {
        console.error("Error editing expense.", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {AddExpense, EditExpense};