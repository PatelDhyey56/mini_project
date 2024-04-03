const { getnormalsearch } = require("../controllers/normalsearch");

var router = require("express").Router();

router.get("/", getnormalsearch);

module.exports = router;
