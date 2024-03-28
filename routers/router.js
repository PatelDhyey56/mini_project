var express = require("express");
var register = require("./register_router");
var task = require("./js_task_router");
var database_name = require("./database_name");
var delimiter_search = require("./delimiter_search");
var normal_search = require("./normal_search");
var student = require("./student");
var orderBy = require("./orderBy");
const token_check = require("../auth/token_check");
var router = express.Router();

router.use("/user", register);

router.use("/task", token_check, task);

router.use("/database-name", token_check, database_name);

router.use("/normal-search", token_check, normal_search);

router.use("/delimiter-search", token_check, delimiter_search);

router.use("/student", token_check, student);

router.use("/order", token_check, orderBy);

router.get("/", token_check, (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
