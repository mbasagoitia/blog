const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const adminToken = process.env.ADMIN_TOKEN;
// Import models here
const BlogPost = require("../models/BlogPost");

router.get("/", (req, res) => {
    res.send("API index");
})

router.get("/test", (req, res) => {
    res.send("Test route working");
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

router.post("/new", async (req, res) => {
    try {
        const token = req.query.token;
        if (token !== adminToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

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

// More routes for editing and deleting posts (protected by isAdmin middleware)

module.exports = router;