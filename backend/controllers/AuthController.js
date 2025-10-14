const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const Register = async(req, res) => {
    const {username, email, password} = req.body;
    const saltRounds = 10;

    if(!username || !email || !password){
        return res.status(400).json({error: "name, email and password are required."})
    }

    try {
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(409).json({error: "User already exist."});
        }

        const hashedPassword = bcrypt.hash(password, saltRounds);

        const newUser = ({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({message: "User registered successfully.", userId: savedUser._id});

        //payload
        const payload = {userId: savedUser._id, username: savedUser.username}

        //token
        const token = jwt.sign(payload, secretKey, {expiresIn: "1h"});

        res.status(200).json({message: "Login successfully.", token});
    } catch (error) {
        console.error({"Registration Error": error.message});
        res.status(500).json("Internal Server Error.");
    }
}