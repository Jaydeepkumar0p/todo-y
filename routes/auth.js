import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Fixed the import path

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            username,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', success: true, user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});



export default router;
