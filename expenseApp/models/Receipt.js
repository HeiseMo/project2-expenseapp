const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  title: String,
  date: String,
  description: String,
  imgName: String,
  imgPath: String,
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
