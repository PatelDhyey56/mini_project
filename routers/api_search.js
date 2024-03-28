var router = require("express").Router();

router.get("/", (req, res) => {
  res.render("api_search/api_search");
});
router.get("/details", (req, res) => {
  res.render("api_search/details");
});

module.exports = router;
