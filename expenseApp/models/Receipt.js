const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  title: String,
  date: String,
  description: String,
  imgName: String,
  imgPath: String,
  // expense: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Expense",
  // },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
