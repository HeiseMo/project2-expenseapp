const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expenseType: String, //dropdown menu with options
  price: String,
  createdDate: String,
  purchaseDate: { type: Date, default: Date.now },
  //purchaseDate: { type: String, default: new Date(Date.now()).toString() },
  description: String,
  items: Array,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
