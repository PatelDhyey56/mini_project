var router = require("express").Router();
var formvalidator = require("../auth/job_form_validator");
const {
  get_ajax_page,
  post_ajex_update,
  getid_ajex,
  postid_ajex,
  getstate,
  getcity,
  getcity_by_state,
} = require("../controllers/ajax_job_application");

router.get("/", get_ajax_page);

router.post("/update", post_ajex_update);

router.get("/id/:id", formvalidator, getid_ajex);

router.post("/update/:id", postid_ajex);

router.get("/state/state", getstate);

router.get("/city/city", getcity);

router.get("/city/city/:state", getcity_by_state);

module.exports = router;
