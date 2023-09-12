const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.static(join(__dirname, "../client/build")));

// Connect to database

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://127.0.0.1:27017/blog', mongooseOptions)
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.error(err);
})

// API routes

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
    try {
      res.sendFile(join(__dirname, "../client/build/index.html"));
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})