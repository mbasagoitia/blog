const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sanitizeHtml = require("sanitize-html");
const { verifyToken } = require("../middlewares/authMiddleware");

dotenv.config();

const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");

// Retrieve API Key for TinyMCE

router.get("/api-key", (req, res) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not found" });
    }
    res.json({ apiKey });
})

router.get("/posts", async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().sort({ createdAt: "desc" });
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching blog posts" })
    }
})

router.get("/singlepost/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await BlogPost.findById(id).exec();
        if (!post) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        res.status(200).json(post);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching single post" })
    }
})

router.get("/comments/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post: postId }).populate("user").sort({ createdAt: "desc" }).exec();
        if (!comments) {
            res.status(200).json({ comments: [] });
        }
        res.status(200).json({ comments: [...comments] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching comments" });
    }
})

router.post("/new", verifyToken, async (req, res) => {
    try {
        if (req.userRole === "admin") {
        const { title, author, description, content, createdAt, tags } = req.body;

        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedDescription = sanitizeHtml(description);
        const sanitizedContent = sanitizeHtml(content);
        const sanitizedTags = sanitizeHtml(tags);
        let sanitizedTagsArr;

        sanitizedTags ? sanitizedTagsArr = sanitizedTags.split(", ") : sanitizedTagsArr = [];

        const newBlogPost = new BlogPost({
            title: sanitizedTitle,
            author: author,
            description: sanitizedDescription,
            content: sanitizedContent,
            createdAt: createdAt,
            tags: sanitizedTagsArr
        });

        const savedPost = await newBlogPost.save();
        res.status(201).json(savedPost);
        }
    } catch (err) {
        console.error("Error creating blog post:", err);
        res.status(500).json({ error: "An error occurred while creating the blog post" });
    }
});

router.post("/comment", verifyToken, async (req, res) => {
    try {
        if (req.userRole === "admin" || req.userRole === "user") {
        const { comment, post, createdAt } = req.body;
        const sanitizedComment = sanitizeHtml(comment);

        const newComment = new Comment({
            comment: sanitizedComment,
            user: req.userId,
            post,
            createdAt
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
        }
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ error: "An error occurred while posting the comment" });
    }
})

router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        if (req.userRole === "admin") {
        const id = req.params.id;
        const updatedData = req.body;

        const sanitizedData = {};

        for (let key in updatedData) {
                    let sanitizedValue = sanitizeHtml(updatedData[key]);
                    sanitizedData[key] = sanitizedValue;
                }        
        
        sanitizedData["tags"] ? sanitizedData["tags"] = sanitizedData["tags"].split(", ") : sanitizedData["tags"] = [];

        const updatedPost = await BlogPost.findByIdAndUpdate(id, sanitizedData, {
            new: true,
        }).exec();
        if (!updatedPost) {
            return res.status(404).json({ error: "Blog post not found" })
        }
        res.status(200).json(updatedPost);
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: "An error occurred while updating the blog post" })
    }
})

router.delete("/delete/post/:id", verifyToken, async (req, res) => {
    try {
        if (req.userRole === "admin") {
            const id = req.params.id;
            const deletedPost = await BlogPost.findByIdAndDelete({ _id: id });
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
        } 
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: "An error occurred while deleting the blog post" })
    }
})

router.delete("/delete/comment/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById({ _id: id });

        // Only admins and users who created the comment can delete it

        if (req.userRole === "admin" || req.userId === comment.user.toString()) {   
            const deletedComment = await Comment.findByIdAndDelete({ _id: id });
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
        } 
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: "An error occurred while deleting the comment" })
    }
})

module.exports = router;