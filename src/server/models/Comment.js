const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true },
    createdAt: { type: Date, required: true },
    tags: Array
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;