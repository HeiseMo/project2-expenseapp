const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");
const Expense = require("../models/Expense");

//items routes
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
    .catch((err) => console.log("error adding item", err));
});

//faq routes
router.get("/faq", (req, res, next) => {
  res.render("items/faq");
});

//settings routes
// router.get("/settings", (req, res, next) => {
//   res.render("items/settings");
// });

// router.post("/settings", (req, res, next) => {
//   const { currency } = req.body;
//   Expense.create({ currency })
//     .then((data) => {
//       console.log(data);
//       res.redirect("/settings");
//     })
//     .catch((err) => console.log("error choosing currency", err));
// });

module.exports = router;
