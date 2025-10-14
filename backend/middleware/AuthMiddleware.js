require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error: "Access denied. No token provided."});
    }

    //verify token

    try {
        const decoded = jwt.verify(token, secretKey);

        if(!decoded){
            return res.status(403).json({message: "Invalid payload"});
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error({"Token Error ": error.message});
        res.status(403).json({message: "Invalid or expired token."})
    }
}

module.exports = protect;