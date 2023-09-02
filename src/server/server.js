const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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


app.get("/api/get-admin-token", (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;
  res.json({ adminToken });
})

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