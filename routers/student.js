const {
  getstudent,
  getresult,
  getresultfinal,
} = require("../controllers/student");

var router = require("express").Router();

router.route("/").get(getstudent);

router.route("/result").get(getresult);

router.route("/result/report/:ID/:Total_marks").get(getresultfinal);

module.exports = router;
