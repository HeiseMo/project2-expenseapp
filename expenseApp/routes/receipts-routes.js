const express = require("express");
const User = require("../models/User");
const Item = require("../models/Item");
const Expense = require("../models/Expense");
const Receipt = require("../models/Receipt");
const multer = require("multer"); //for handling multipart data eg uploading files
const uploadCloud = require("../config/cloudinary.js");

const router = express.Router();
const app = express();
const upload = multer();

router.get("/settings", (req, res, next) => {
  console.log(req.user, "this is the user");
  Receipt.find().then((receipt) => {
    console.log(receipt);
    res.render("items/settings", { receipt: receipt });
  });
});

router.post("/settings", uploadCloud.single("photo"), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  //console.log(imgPath, "this is the image path");
  const imgName = req.file.originalname;
  //console.log(imgName);

  Receipt.create({ title, description, imgPath, imgName })
    .then((receipt) => {
      //console.log(receipt);
      res.redirect("/settings");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
