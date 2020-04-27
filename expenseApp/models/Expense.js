const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expenseType: String, //dropdown menu with options
  price: Number,
  createdDate: String,
  purchaseDate: Date,
  description: String,
  items: Array,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
