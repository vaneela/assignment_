const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterHandler = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    const user = await UserModel.findOne({ username: username });
    if (user) {
        res.status(400).json({ message: "Username already exists" })
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new UserModel({ username, password: hashedPassword, firstname, lastname });
        try {
            const user = await newUser.save();
            const token = jwt.sign({
                username: user.username, id: user._id
            }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

const LoginHandler = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                res.status(400).json({ message: "Not valid User!" })
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' });
                res.status(200).json({ user, token });;
            }

        } else {
            res.status(404).json({ message: "User not found!" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { RegisterHandler, LoginHandler }