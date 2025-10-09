const { default: mongoose } = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    title: {
        type: String,
        required: true
    },
    amount: Number,
    category: String,
    date: Date,
    notes: String
}, {timestamps: true})