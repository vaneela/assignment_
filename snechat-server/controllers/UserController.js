const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const GetUserHandler = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const UpdateUserHandler = async (req, res) => {
    const id = req.params.id;
    const { _id, isAdmin, password } = req.body;
    if (id == _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

}

const DeleteUserHandler = async (req, res) => {
    const { currentUserId, userId } = req.body;
    try {
        const user = await UserModel.findById(currentUserId);
        const isAdmin = user.isAdmin;
        if (currentUserId == userId || isAdmin) {
            try {
                const userToDelete = await UserModel.findByIdAndDelete(userId);
                res.status(200).json({ message: userToDelete });
            } catch (error) {
                res.status(401).json({ message: "user not exists" });
            }
        } else {
            res.status(400).json({ message: "You are not authorized to delete" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }

}

const FollowUserHandler = async (req, res) => {
    const userIdToFollow = req.params.id;
    const { _id } = req.body;
    if (_id !== userIdToFollow) {
        try {
            const followUser = await UserModel.findById(userIdToFollow);
            const followingUsers = await UserModel.findById(_id);
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUsers.updateOne({ $push: { following: userIdToFollow } });
                res.status(201).json({ message: "User followed" })
            } else {
                res.status(400).json({ message: "user already followed" })
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    } else {
        res.status(403).json({ message: "Forbidden" })
    }
}

const UnFollowUserHandler = async (req, res) => {
    const userIdToFollow = req.params.id;
    const { _id } = req.body;
    if (_id !== userIdToFollow) {
        try {
            const followUser = await UserModel.findById(userIdToFollow);
            const followingUsers = await UserModel.findById(_id);
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } });
                await followingUsers.updateOne({ $pull: { following: userIdToFollow } });
                res.status(201).json({ message: "User unfollowed" });
            } else {
                res.status(400).json({ message: "user not followed by you" });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
}

const GetAllUsersHandler = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users) {
            users.map((user) => {
                const { password, ...otherDetails } = user._doc;
                return otherDetails;
            })
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "users not found" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { GetUserHandler, UpdateUserHandler, DeleteUserHandler, FollowUserHandler, UnFollowUserHandler, GetAllUsersHandler }