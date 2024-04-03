const { getdatabse, postdatabase } = require("../controllers/databasename");

var router = require("express").Router();

router.route("/").get(getdatabse).post(postdatabase);

module.exports = router;
