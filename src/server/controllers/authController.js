const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const dotenv = require("dotenv");
dotenv.config();

async function registerNonAdmin (req, res) {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email, username, password: hashedPassword,
            role: "user"
        })
        await newUser.save();
        res.status(201).json({ message: "Registration successful" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

async function createAdmin (req, res) {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({
            email, username, password: hashedPassword,
            role: "admin"
        })
        await newUser.save();
        res.status(201).json({ message: "Registration successful" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

async function login (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect password" })
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    registerNonAdmin,
    createAdmin,
    login
}