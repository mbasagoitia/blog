const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
// const config = require("./config");
const { createProxyMiddleware } = require("http-proxy-middleware");
const errorHandler = require("./middlewares/errorHandler");

const apiRoutes = require("./routes/apiRoutes");


const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(express.static("public"));

// For production

app.use(express.static(join(__dirname, "../client/build")));

// Set up middleware, authentication, etc.

// Connect to database

// Test route

// Use API routes

app.use("/api", apiRoutes);

// For production

app.use((req, res, next) => {
    try {
      res.sendFile(join(__dirname, "../client/build/index.html"));
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})