const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello and welcome to the auth routes.");
});

router.get("/login", authController.getLogin);

router.post("/login", authController.authenticate);

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.delete("/delete/:id", authController.deleteUser);

router.get("/logout", authController.logout);

module.exports = router;
