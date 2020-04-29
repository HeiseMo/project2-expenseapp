const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const ensureLogin = require("connect-ensure-login");

//add expenses
router.post("/dashboard", (req, res) => {
  const {
    expenseType,
    createdDate,
    price,
    purchaseDate,
    description,
    item,
  } = req.body;
  console.log(typeof purchaseDate, purchaseDate, "typeof");
  let dt = new Date();
  const newExpense = new Expense({
    user: req.user._id,
    expenseType,
    createdDate:
      dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
    price,
    purchaseDate,
    // dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
    description,
    item,
  });
  newExpense
    .save()
    .then((expense) => {
      console.log(expense);
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log("Error creating new expense", err);
      //res.send("New expense created", req.body);
      res.render("auth/dashboard");
    });
});

router.get("/expenses/daily", ensureLogin.ensureLoggedIn(), (req, res) => {
  let day = req.query.day
    ? req.query.day
    : new Date().toISOString().slice(0, 10);
  // let start = req.query.start;
  let end = req.query.end;
  const userId = req.user._id;
  console.log(userId, `userId`);
  console.log(day, end);

  if (day && end) {
    Expense.find({ user: req.user._id, purchaseDate: { $gte: day, $lte: end } })
      .sort({ purchaseDate: 1 })
      .then((expenseData) => {
        console.log(expenseData);
        res.render("expenses/daily", {
          expense: expenseData,
          expenseString: JSON.stringify(expenseData),
        });
      })
      .catch((err) => console.log("error", err));
  } else if (day) {
    Expense.find({ user: req.user._id, purchaseDate: day })
      .sort({ purchaseDate: 1 })
      .then((expenseData) => {
        console.log(expenseData);
        res.render("expenses/daily", {
          expense: expenseData,
          expenseString: JSON.stringify(expenseData),
        });
      })
      .catch((err) => {
        console.log("Error retrieving expenses from DB", err);
        next();
      });
  } else {
    res.render("expenses/daily");
  }
});
// router.get("/expenses/daily", (req, res) => {
//   let day = req.query.day;
//   // let start = req.query.start;
//   let end = req.query.end;
//   console.log(day);
//   console.log(end);
//   if (day && !end) {
//     Expense.find({ purchaseDate: day })
//       .sort({ purchaseDate: 1 })
//       .then((expenseData) => {
//         res.render("expenses/daily", {
//           expense: expenseData,
//           expenseString: JSON.stringify(expenseData),
//         });
//       })
//       .catch((err) => {
//         console.log("Error retrieving expenses from DB", err);
//       });
//   } else if (day && end) {
//     Expense.find({ purchaseDate: { $gte: day, $lte: end } })
//       .sort({ purchaseDate: 1 })
//       .then((expenseData) => {
//         res.render("expenses/daily", {
//           expense: expenseData,
//           expenseString: JSON.stringify(expenseData),
//         });
//       })
//       .catch((err) => console.log("error", err));
//   }
// });

// router.get("/expenses/daily", (req, res) => {
//   let start = req.query.start;
//   let end = req.query.end;
//   console.log("start", req.query);
//   Expense.find({ purchaseDate: { $gte: start, $lte: end } })
//     .sort({ purchaseDate: 1 })
//     .then((expenseData) => {
//       res.render("expenses/daily", {
//         expense: expenseData,
//         expenseString: JSON.stringify(expenseData),
//       });
//     })
//     .catch((err) => {
//       console.log("Error retrieving expenses from DB", err);
//       next();
//     });
// });

router.get("/expenses/monthly", (req, res, next) => {
  let month = req.query.month;
  Expense.find({ user: req.user._id })
    .then((expenseData) => {
      expenseData = expenseData
        .sort((a, b) => a.purchaseDate - b.purchaseDate)
        .filter((val) => {
          return val.purchaseDate.includes(month);
        });
      res.render("expenses/monthly", {
        expense: expenseData,
        expenseString: JSON.stringify(expenseData),
      });
    })
    .catch((err) => {
      console.log("Error retrieving expenses from DB", err);
      next();
    });
});

router.get("/expenses/yearly", (req, res, next) => {
  let year = req.query.year;
  console.log("typeof", year);
  Expense.find({ user: req.user._id })
    .then((expenseData) => {
      expenseData = expenseData
        .sort((a, b) => a.purchaseDate - b.purchaseDate)
        .filter((val) => {
          return val.purchaseDate.includes(year);
        });
      console.log(expenseData, "expense");
      res.render("expenses/yearly", {
        expense: expenseData,
        expenseString: JSON.stringify(expenseData),
      });
    })
    .catch((err) => {
      console.log("Error retrieving expenses from DB", err);
      next();
    });
});

router.get("/dashboard/:id/edit", (req, res, next) => {
  //res.send("Hey");
  Expense.findById(req.params.id).then((expenseData) => {
    console.log(expenseData);
    res.render("expenses/edit", { oneExpense: expenseData });
  });
});

router.post("/dashboard/:id/edit", (req, res, next) => {
  const { expenseType, purchaseDate, price, description } = req.body;
  Expense.findByIdAndUpdate(req.params.id, {
    $set: { expenseType, purchaseDate, price, description },
  })
    .then((expenseData) => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/dashboard/:id/delete", (req, res, next) => {
  console.log("hey");
  Expense.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
