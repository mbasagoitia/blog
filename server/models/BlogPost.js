const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String
    // other fields such as author, createdAt
})

const BlogPost = mongoose.model("BlogPost", blogPostSchema)

module.exports = BlogPost;