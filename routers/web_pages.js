var router = require("express").Router();
router.get("/1", (req, res) => {
  res.render("web_pages/web_page1/Web_page");
});
router.get("/2", (req, res) => {
  res.render("web_pages/web_page2/wep_page_2");
});
router.get("/3", (req, res) => {
  res.render("web_pages/web_page3/web_page_3");
});
module.exports = router;
