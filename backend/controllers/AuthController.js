const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const Register = async(req, res) => {
    const {username, email, password, subscriptionStatus} = req.body;
    const saltRounds = 10;

    if(!username || !email || !password){
        return res.status(400).json({error: "name, email and password are required."})
    }

    try {
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(409).json({error: "User already exist."});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            subscriptionStatus
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

const Login = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({message: "Username and password required."})
    }

    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message: "Invalid Credentials."});
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(401).json({message: "Invalid Credentials."});
        }

        //payload
        const payload = {userId: user._id, username: user.username};

        //token
        const token = jwt.sign(payload, secretKey, {expiresIn: "1h"});

        res.status(200).json({message: "Login Successfully.", token});
    } catch (error) {
        console.error({error: message.error});
        res.status(500).json({error: message.error});
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        if(!users || users === 0){
            return res.status(404).json({error: "Users not Found"});
        }
        res.json(users);
    } catch (error) {
        console.error("Error Getting Users: ", error);
        res.status(500).json({error: error.message});
    }
}

module.exports = {Register, Login, getAllUsers};