const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;

app.listen(process.env.PORT||PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});