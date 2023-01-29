const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    comment: {type: String, required : true},
    createdAt: {
      type: Date,
      default: new Date(),
    },
    },
  {
    timestamps: true,
  }
);

var CommentModel = mongoose.model("Comments", commentSchema);

module.exports = CommentModel;