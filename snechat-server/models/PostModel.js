const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    author:String,
    authorName: String,
    authorImage:String,
    desc: {type: String, required : true},
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
    },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

module.exports = PostModel;