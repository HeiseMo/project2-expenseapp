const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
  {
    title: String,
    date: String,
    description: String,
    imgName: String,
    imgPath: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
