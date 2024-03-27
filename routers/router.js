var express = require("express");
var register = require("./register");
var router = express.Router();

router.use("/user", register);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
