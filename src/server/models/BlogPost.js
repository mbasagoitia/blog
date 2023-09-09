const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    tags: Array
})

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;