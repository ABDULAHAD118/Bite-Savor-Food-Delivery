import User from '../models/user.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { createToken } from '../middlewares/auth.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }
        const token = await createToken(user._id);
        res.json({ success: true, token, message: 'Login Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = User.create({
            name,
            email,
            password: hash
        });
        if (!newUser) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        const token = await createToken(newUser._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export {
    loginUser,
    registerUser
}