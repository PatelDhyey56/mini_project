var express = require("express");
var register = require("./register_router");
var task = require("./js_task_router");
var database_name = require("./database_name");
var delimiter_search = require("./delimiter_search");
var normal_search = require("./normal_search");
var student = require("./student");
var orderBy = require("./orderBy");
var router = express.Router();

router.use("/user", register);

router.use("/task", task);

router.use("/database-name", database_name);

router.use("/normal-search", normal_search);

router.use("/delimiter-search", delimiter_search);

router.use("/student", student);

router.use("/order", orderBy);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
