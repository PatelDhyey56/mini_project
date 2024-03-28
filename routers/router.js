var express = require("express");
var register = require("./register_router");
var task = require("./js_task_router");
var database_name = require("./database_name");
var delimiter_search = require("./delimiter_search");
var normal_search = require("./normal_search");
var student = require("./student");
var orderBy = require("./orderBy");
var job_application = require("./normal_job_application");
var ajax_job_application = require("./ajax_job_application");
var api_search = require("./api_search");

const token_check = require("../auth/token_check");
var router = express.Router();

router.use("/user", register);

router.use("/task", token_check, task);

router.use("/database-name", token_check, database_name);

router.use("/normal-search", token_check, normal_search);

router.use("/delimiter-search", token_check, delimiter_search);

router.use("/student", token_check, student);

router.use("/order", token_check, orderBy);

router.use("/job-application", token_check, job_application);

router.use("/ajax-job-application", token_check, ajax_job_application);

router.use("/api-search", token_check, api_search);

router.get("/", token_check, (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
