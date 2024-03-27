const {
  tictactoe,
  cucucube,
  sorting,
  dynamic_table,
  event,
} = require("../controllers/js_task");

var router = require("express").Router();

router.route("/dynamic-table").get(dynamic_table);

router.route("/event").get(event);

router.route("/sorting").get(sorting);

router.route("/tic-tac-toe").get(tictactoe);

router.route("/cucu-cube").get(cucucube);

module.exports = router;
