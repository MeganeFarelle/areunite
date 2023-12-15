const usersDAO = require("../models/usersModel");

const db = new usersDAO("users.db");
// db.init();

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.getUser(email);
  console.log(user);

  if (!user) {
    return res.redirect("/auth/login");
  }

  if (user.password !== password) {
    return res.redirect("/auth/login");
  }

  req.session.user = user;

  return res.redirect("/events");
};

// Manager role middleware
exports.isManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "manager") {
    return next();
  }
  res.redirect("/auth/login");
};

exports.getLogin = function (req, res) {
  res.render("login");
};

exports.getRegister = function (req, res) {
  res.render("register");
};

exports.postRegister = async function (req, res) {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    graduation_year: req.body.graduation_year,
    email: req.body.email,
    password: req.body.password,
    role: "user",
  };

  await db.addUser(newUser);
  res.redirect("/auth/login");
};

exports.deleteUser = async function (req, res) {
  const id = req.params.id;
  await db.deleteUser(id);
  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
