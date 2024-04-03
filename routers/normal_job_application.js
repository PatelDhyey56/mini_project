var router = require("express").Router();
var formvalidator = require("../auth/job_form_validator");
const {
  get_jobapplication,
  post_jobapplication,
  get_id,
  post_id,
  get_alldata,
} = require("../controllers/job_application");

router
  .route("/")
  .get(get_jobapplication)
  .post(formvalidator, post_jobapplication);

router.get("/:id", get_id);

router.post("/update/:id", formvalidator, post_id);

module.exports = router;
