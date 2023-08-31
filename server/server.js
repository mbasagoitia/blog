const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

// set up middleware, authentication, etc.

// Connect to database

// Use API routes
app.use("/api", apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})