const mongoose = require("mongoose");
const { updateOne, where } = require("../models/PostModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const CommentModel = require("../models/CommentModel");

const CreatePostHandler = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const GetPostHandler = async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    const following = user.following;
    var query = { $where: function() { return (this.userId.includes(following)) }};
    try {
        const posts = await PostModel.find(query);
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const UpdatePostHandler = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);
        console.log(userId + "-" + post.userId);
        if (post.userId == userId) {
            await PostModel.updateOne(req.body);
            res.status(201).json({ message: "Post Updated" });
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const DeletePostHandler = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try {
        const post = await PostModel.findById(postId);
        if (post.userId == userId) {
            await PostModel.findByIdAndDelete(postId);
            await CommentModel.deleteMany({postId:postId})
            res.status(201).json({ message: "Post Deleted",deletedPostId :postId });
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const LikePostHandler = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post Liked" });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post UnLiked" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const GetTimeLinePosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ]);
        res.status(200).json(   currentUserPosts.concat(followingPosts[0].followingPosts).sort((a, b) => {
            return new Date(b.createdAt) - new Date (a.createdAt);
        }));
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { CreatePostHandler, GetPostHandler, UpdatePostHandler, DeletePostHandler, LikePostHandler, GetTimeLinePosts }