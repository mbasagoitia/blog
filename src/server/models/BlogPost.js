const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    createdAt: Date,
    tags: Array
})

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;