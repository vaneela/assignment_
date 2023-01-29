const mongoose = require("mongoose");
const { updateOne, where, findById } = require("../models/CommentModel");
const CommentModel = require("../models/CommentModel");
const UserModel = require("../models/UserModel");

const CreateCommentHandler = async (req, res) => {
    const newComment = new CommentModel(req.body);
    try {
        var newData = await newComment.save();
        const user = await UserModel.findById(newData.userId);
        var result = {
            userId: newData.userId,
            postId: newData.postId,
            comment: newData.comment,
            createdAt: newData.createdAt.toString(),
            _id: newData._id,
            updatedAt: newData.updatedAt.toString(),
            __v: newData.__v,
            commenter: user.username,
            commenterName: user.firstname + " " + user.lastname,
            commenterImage: user.profileImage
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const GetTimeLineComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await CommentModel.find({ postId: postId }).sort({createdAt:-1});
        var finalResult = [];
        for (var i = 0; i < comments.length; i++) {
            const user = await UserModel.findById(comments[i].userId);
            var result = {
                userId: comments[i].userId,
                postId: comments[i].postId,
                comment: comments[i].comment,
                createdAt: comments[i].createdAt.toString(),
                _id: comments[i]._id,
                updatedAt: comments[i].updatedAt.toString(),
                __v: comments[i].__v,
                commenter: user.username,
                commenterName: user.firstname + " " + user.lastname,
                commenterImage: user.profileImage
            };
            finalResult.push(result);
        }
        res.status(200).json(finalResult);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const DeleteCommentHandler = async (req,res)=>{
    const commentId = req.params.commentId;
    console.log("commentId : ",commentId)
    try {
        const deletedComment =  await CommentModel.findByIdAndDelete(commentId);
        res.status(200).json({message:"Comment Deleted!",data:deletedComment});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { CreateCommentHandler, GetTimeLineComments,DeleteCommentHandler }