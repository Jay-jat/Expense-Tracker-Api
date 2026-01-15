const express = require("express");
const {
  showExpenses,
  addExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

const router = express.Router();

router.get("/", showExpenses);
router.post("/add", addExpense);
router.post("/delete/:id", deleteExpense);

module.exports = router;
