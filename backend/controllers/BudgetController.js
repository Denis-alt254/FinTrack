const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const SetBudget = async(req, res) => {
    try {
        const {category, limit, month, year} = req.body;

        const update = await Budget.findOneAndUpdate(
            {category, month, year},
            {limit},
            {upsert: true, new: true}
        )

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const CheckBudgetUsage = async(req, res) => {
    try {
        const {category, month, year} = req.body;
        
        //find budget 

        const budget = await Budget.findOne({category, month: Number(month), year: Number(year)});

        if(!budget){
            return res.status(404).json({message: "No budget set for this category and month, set one."})
        }

        //Define date range

        const StartDate = new Date(year, month-1, 1);
        const EndDate = new Date(year, month, 1);

        //sum expenses in that category and date

        const expenses = await Expense.aggregate([
            {
                $match: {
                    category,
                    date: {$gte: StartDate, $lt: EndDate}
                }
            },
            {
                $group: {
                    _id: null,
                    totalSpent: {$sum: "$amount"}
                }
            }
        ]);

        //calculate spent and remaining

        const spent = expenses[0]?.totalSpent || 0;
        const remaining = budget.limit - spent;

        res.status(200).json({category, month, year, spent, remaining});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {SetBudget, CheckBudgetUsage};