const express = require("express");
const User = require("../models/User");
const Item = require("../models/Item");
const Expense = require("../models/Expense");
const multer = require("multer"); //for handling multipart data eg uploading files
const fetch = require("node-fetch");

const router = express.Router();
const app = express();
const upload = multer();

app.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("Done");
});

module.exports = router;
