require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const uploadCloud = require("./config/cloudinary.js");
const Receipts = require("./models/Receipt");

// handlebar helpers

hbs.handlebars.registerHelper("formatDate", function (date) {
  const formattedDate = date.toString().slice(3, 16);
  return formattedDate;
});

// expenseSorting
hbs.handlebars.registerHelper("sortExpenses", function (type) {
  const formattedDate = date.toString().slice(3, 16);
  return formattedDate;
});

//Session Stuff
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// require passport and the local strategy
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// User model
const User = require("./models/User");

mongoose
  .connect(
    "mongodb://localhost/expenseapp",
    // "mongodb://heroku_kgk0ltwq:j69f2p3cfojihlvep2jo7fg34d@ds235417.mlab.com:35417/heroku_kgk0ltwq",
    {
      useNewUrlParser: true,
    }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport Middleware

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne(
      {
        username,
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, {
            message: "Incorrect credentials",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, {
            message: "Incorrect credentials",
          });
        }

        return next(null, user);
      }
    );
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth-routes");
app.use("/", authRoutes);

const expensesView = require("./routes/expenses");
app.use("/", expensesView);

const itemRoutes = require("./routes/item-routes");
app.use("/", itemRoutes);

const receiptsRoutes = require("./routes/receipts-routes");
app.use("/", receiptsRoutes);

module.exports = app;

app.listen(3000, function () {
  console.log("Example app listening on port 3000test node!");
});
