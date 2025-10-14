const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

//connect to database
connectDB();

app.listen(process.env.PORT||PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});