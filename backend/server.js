const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const AuthRouter = require("./routes/userRouter");
const ExpenseRouter = require("./routes/ExpenseRouter");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

//connect to database
connectDB();

//routes
app.use('/api/users', AuthRouter);
app.use('/api/expense', ExpenseRouter);

app.listen(process.env.PORT||PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});