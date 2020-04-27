const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");

router.get("/add-item", (req, res, next) => {
  Item.find().then((data) => {
    res.render("items/add", { itemsData: data });
  });
});
router.post("/add-item", (req, res, next) => {
  const { name, price } = req.body;
  Item.create({ name, price })
    .then((data) => {
      res.redirect("/add-item");
    })
    .catch((err) => console.log("error", err));
});

module.exports = router;
