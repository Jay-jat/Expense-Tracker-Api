const express = require("express");
const path = require("path");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Authentication Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

// Register User
app.get("/register", (req, res) => {
  res.render("register");
});



module.exports = app;
