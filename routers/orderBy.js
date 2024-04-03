var router = require("express").Router();
const { getorderby, postorderby } = require("../controllers/orderby");

router.route("/").get(getorderby).post(postorderby);

module.exports = router;
