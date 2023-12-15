const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mustache = require('mustache-express');
const session = require('express-session');
const flash = require('connect-flash');

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const miscRoutes = require("./routes/miscRoutes");

const usersDAO = require("./models/usersModel");

const db = new usersDAO("users.db");

const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use(bodyParser.urlencoded({extended: false}));

// Add session and flash middleware
app.use(session({
  secret: 'xds345tgerht',
  resave: false,
  saveUninitialized: false
}));

// Middleware to pass user data to templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(flash());

app.use("/events", eventRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", miscRoutes);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

// app.get("/dashboard", async function (req, res) {
//   const users = await db.getAllUsers();
//   console.log(users);
//   res.render("dashboard", { user: req.session.user, isManager: req.session.user?.role === 'manager', users: users });
// });

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});