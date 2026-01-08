const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SESSION MIDDLEWARE (FIRST)
app.use(
  session({
    secret: "expense_tracker_secret",
    resave: false,
    saveUninitialized: false
  })
);

// Session Middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// pages
app.get("/", (req, res) => {
  const loggedIn = !!req.session.user;
  res.render("index", { loggedIn });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = app;
