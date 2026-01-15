const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware
app.use(
  session({
    secret: "expense_tracker_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// expose session user to views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// auth guard
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
const authRoutes = require("./routes/auth.routes");
const expensesRoutes = require("./routes/expenses.routes");

app.use("/api/auth", authRoutes);
app.use("/expenses", requireAuth, expensesRoutes);

// pages
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/expenses");
  }
  res.render("index");
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

app.delete("", (req,res) => {
  
})

module.exports = app;
