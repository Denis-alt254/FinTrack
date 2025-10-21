const Budget = require("../models/Budget");

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

module.exports = {SetBudget};