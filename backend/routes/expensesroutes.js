const express = require("express");
const router = express.Router();
const Expenses = require("../models/expensesSchema");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();
const { SECRET_KEY } = process.env;

// POST a new expense (Protected with authMiddleware)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, date, description, notes, item } = req.body;

    // Log req.user._id to check its value
    console.log("req.user._id:", req.user._id);

    const newExpense = new Expenses({
      amount,
      category,
      date,
      description,
      notes,
      item,
      author: req.user._id,
    });
    await newExpense.save();
    res.status(201).json({ message: "Expense created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to add expense", message: error.message });
  }
});

// GET expenses created by the logged-in user (Protected with authMiddleware)
router.get("/userexpenses", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const userExpenses = await Expenses.find({ author: userId });
    res.status(200).json(userExpenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user expenses", error: error.message });
  }
});

// PUT: Update an expense by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Use req.params.id to get the ID
    const updatedExpenseData = req.body; // This should contain the updated fields

    // Find the expense by ID and update it with new data
    const updatedExpense = await Expenses.findByIdAndUpdate(
      id,
      updatedExpenseData,
      {
        new: true, // Return the updated expense
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE an expense by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Use req.params.id to get the ID

    // Find the expense by ID and remove it
    const deletedExpense = await Expenses.findByIdAndRemove(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
