const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { verifyToken } = require("../middlewares/authMiddleware");


dotenv.config();

const adminToken = process.env.ADMIN_TOKEN;
// Import models here
const BlogPost = require("../models/BlogPost");

router.get("/", (req, res) => {
    res.send("API index");
})

router.get("/posts", async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().sort({ createdAt: "desc" });
        res.status(200).json(blogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while fetching blog posts" })
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

router.post("/new", verifyToken, async (req, res) => {
    try {
        const { title, description, content, createdAt, tags } = req.body;
        const newBlogPost = new BlogPost({
            title,
            description,
            content,
            createdAt,
            tags
        });
        const savedPost = await newBlogPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error("Error creating blog post:", err);
        res.status(500).json({ error: "An error occurred while creating the blog post" });
    }
});

router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedPost = await BlogPost.findByIdAndUpdate(id, updatedData, {
            new: true,
        }).exec();
        if (!updatedPost) {
            return res.status(404).json({ error: "Blog post not found" })
        }
        res.status(200).json(updatedPost);
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: "An error occurred while updating the blog post" })
    }
})

router.delete("/delete/:id", verifyToken, async (req, res) => {
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

module.exports = router;