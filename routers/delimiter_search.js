var router = require("express").Router();
const { dalimetersearch } = require("../controllers/databasename");

router.get("/", dalimetersearch);

module.exports = router;
