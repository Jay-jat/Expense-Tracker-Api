const Expense = require("../models/Expense");

// Show dashboard with expenses
const showExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.session.user.id,
    }).sort({ date: -1 });

    res.render("expenses", {
      user: req.session.user,
      expenses,
    });
  } catch (error) {
    console.error("FETCH EXPENSES ERROR:", error);
    res.status(500).send("Server Error");
  }
};

// Add expense
const addExpense = async (req, res) => {
  try {
    const { amount, type, category, note } = req.body;

    if (!amount || isNaN(amount) || !type || !category) {
      return res.status(400).send("Invalid input");
    }

    await Expense.create({
      user: req.session.user.id,
      amount: Number(amount),
      type,
      category,
      note,
    });

    res.redirect("/expenses");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.deleteOne({
      _id: expenseId,
      user: req.session.user.id,
    });
    res.redirect("/expenses");
  } catch (error) {
    console.log("Delete expense error");
    res.status(500).send("Server Error");
  }
};

module.exports = { showExpenses, addExpense, deleteExpense };
