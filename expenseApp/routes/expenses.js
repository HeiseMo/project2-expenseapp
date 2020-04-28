const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

router.get("/expenses", (req, res, next) => {
  Expense.find()
    .then((expenseData) => {
      console.log("Retrieved expense from DB:", expenseData);

      res.render("auth/expenses", { expense: expenseData });
    })
    .catch((err) => {
      console.log("Error retrieving expenses from DB", err);
      next();
    });
});

//add expenses
router.post("/expenses", (req, res) => {
  const {
    expenseType,
    createdDate,
    price,
    purchaseDate,
    description,
    item,
  } = req.body;
  let dt = new Date();
  const newExpense = new Expense({
    expenseType,
    createdDate:
      dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
    price,
    purchaseDate,
    description,
    item,
  });
  newExpense
    .save()
    .then((expense) => {
      console.log(expense);
      res.redirect("/expenses");
    })
    .catch((err) => {
      console.log("Error creating new expense", err);
      //res.send("New expense created", req.body);
      res.render("auth/expenses");
    });
});

router.get("/expenses/daily", (req, res) => {
  res.render("expenses/daily");
});

module.exports = router;
