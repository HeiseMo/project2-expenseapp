const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expenseType: String, //dropdown menu with options
  price: Number,
  createdDate: String,
  purchaseCurrency: String,
  purchaseDate: String,
  description: String,
  items: Array,
  receipt: Array,
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
