var express = require("express");

var middleware = require("../auth/register_middleware");
var formvalidator = require("../auth/job_form_validator");

const token_check = require("../auth/token_check");
var router = express.Router();

// user
const {
  getlogin,
  postlogin,
  getforgotpassword,
  postforgotpassword,
} = require("../controllers/login");
const {
  getrequest,
  postrequest,
  add_passs,
} = require("../controllers/register");

router
  .route("/user/register")
  .get(getrequest)
  .post(middleware.formvalidator, postrequest);
router.route("/user/register/pass").post(add_passs);
router.route("/user/login").get(token_check, getlogin).post(postlogin);

router
  .route("/user/forgotpassword")
  .get(getforgotpassword)
  .post(postforgotpassword);

// task
const {
  tictactoe,
  cucucube,
  sorting,
  dynamic_table,
  event,
} = require("../controllers/js_task");

router.route("/task/dynamic-table").get(token_check, dynamic_table);
router.route("/task/event").get(token_check, event);
router.route("/task/sorting").get(token_check, sorting);
router.route("/task/tic-tac-toe").get(token_check, tictactoe);
router.route("/task/cucu-cube").get(token_check, cucucube);

// database_name
const { getdatabse, postdatabase } = require("../controllers/databasename");
router
  .route("/database-name")
  .get(token_check, getdatabse)
  .post(token_check, postdatabase);

// normal-search
// delimiter-search
const { getnormalsearch, dalimetersearch } = require("../controllers/search");
router.get("/normal-search", token_check, getnormalsearch);

router.get("/delimiter-search", token_check, dalimetersearch);

// student
const {
  getstudent,
  getresult,
  getresultfinal,
} = require("../controllers/student");

router.route("/student").get(token_check, getstudent);
router.route("/student/result").get(token_check, getresult);
router
  .route("/student/result/report/:ID/:Total_marks")
  .get(token_check, getresultfinal);

// order
const { getorderby, postorderby } = require("../controllers/orderby");
router
  .route("/order")
  .get(token_check, getorderby)
  .post(token_check, postorderby);

// job-application
const {
  get_jobapplication,
  post_jobapplication,
  get_id,
  post_id,
} = require("../controllers/job_application");

router
  .route("/job-application")
  .get(get_jobapplication)
  .post(formvalidator, post_jobapplication);
router.get("/job-application/:id", token_check, get_id);
router.post("/job-application/update/:id", token_check, formvalidator, post_id);

// ajax-job-application

const {
  get_ajax_page,
  post_ajex_update,
  getid_ajex,
  postid_ajex,
  getstate,
  getcity,
  getcity_by_state,
  get_alldata,
} = require("../controllers/ajax_job_application");

router.get("/ajax-job-application", token_check, get_ajax_page);
router.post("/ajax-job-application/update", token_check, post_ajex_update);
router.get(
  "/ajax-job-application/id/:id",
  token_check,
  formvalidator,
  getid_ajex
);
router.get(
  "/ajax-job-application/all",
  token_check,
  formvalidator,
  get_alldata
);
router.post("/ajax-job-application/update/:id", token_check, postid_ajex);
router.get("/ajax-job-application/state/state", token_check, getstate);
router.get("/ajax-job-application/city/city", token_check, getcity);
router.get("/ajax-job-application/city/city/:state", getcity_by_state);

// api-search
router.get("/api-search", token_check, (req, res) => {
  res.render("api_search/api_search");
});
router.get("/api-search/details", token_check, (req, res) => {
  res.render("api_search/details");
});

// web-pages
router.get("/web-pages/1", token_check, (req, res) => {
  res.render("web_pages/web_page1/Web_page");
});
router.get("/web-pages/2", token_check, (req, res) => {
  res.render("web_pages/web_page2/wep_page_2");
});
router.get("/web-pages/3", token_check, (req, res) => {
  res.render("web_pages/web_page3/web_page_3");
});

router.get("/", token_check, (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.render("error_page");
});
module.exports = { router };
