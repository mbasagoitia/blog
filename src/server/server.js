const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { join } = require("path");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const User = require("./models/Users");

dotenv.config();

// async function showUsers () {
//   const users = await User.find();
//   console.log(users);
// }

// showUsers();

const adminToken = process.env.ADMIN_TOKEN;

const { BlogPost } = require("./models/BlogPost");

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/auth");


const app = express();

// async function createAdminAccount () {
//   try {
//     const adminExists = await User.exists({ role: "admin" });
//     if (!adminExists) {
//       const hashedPassword = await bcrypt.hash("Truffles#431", 10);
//       const adminUser = new User({
//         email: "marika.basagoitia@gmail.com",
//         username: "mbasagoitia",
//         password: hashedPassword,
//         role: "admin"
//       })
//       await adminUser.save();
//       console.log("Admin account created successfully");
//     } else {
//       console.log("Admin account already exists");
//     }
//   } catch(err) {
//     console.error(err);
//   }
// }

// createAdminAccount();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(express.static("public"));

// For production

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

// Use API routes

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

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