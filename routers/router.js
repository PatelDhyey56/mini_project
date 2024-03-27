var express = require("express");
var register = require("./register_router");
var task = require("./js_task_router");
var database_name = require("./database_name");
var router = express.Router();

router.use("/user", register);
router.use("/task", task);
router.use("/database-name", database_name);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
