var express = require("express");
var register = require("./register_router");
var task = require("./task_router");
var router = express.Router();

router.use("/user", register);
router.use("/task", task);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
