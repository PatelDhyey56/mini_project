var router = require("express").Router();
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
var middleware = require("../auth/register_middleware");

router
  .route("/register")
  .get(getrequest)
  .post(middleware.formvalidator, postrequest);

router.route("/register/pass").post(add_passs);

router.route("/login").get(getlogin).post(postlogin);

router.route("/forgotpassword").get(getforgotpassword).post(postforgotpassword);

module.exports = router;
