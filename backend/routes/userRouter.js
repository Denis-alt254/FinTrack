const express = require("express");
const { Register, Login, getAllUsers } = require("../controllers/AuthController");
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/', getAllUsers);

module.exports = router;