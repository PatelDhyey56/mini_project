var router = require("express").Router();
var con = require("../services/database");

router.get("/", (req, res) => {
  var query = require("url").parse(req.url, true).query;
  if (!query.page) {
    res.render("search/orderby", { result: false });
  } else {
    let sql = String(query.sql);
    let total_data = Number(query.total_data);
    let col1 = query.col1;
    // console.log(col1);
    search_page(req, res, total_data, col1, sql);
  }
});

router.post("/", (req, res) => {
  let sql = req.body.sql;
  con.con.query(sql, function (err, result, fields) {
    if (err) {
      res.render("error_page");
    } else {
      //   console.log(fields[0].name);
      search_page(req, res, result.length, fields[0].name, sql);
    }
  });
});

function search_page(req, res, total_data, col1, sql) {
  var query = require("url").parse(req.url, true).query;
  let page = Number(query.page) || 1;
  let data = query.data || 50;
  var last_page = Number(Math.ceil(total_data / data));
  var col = query.col || col1;
  var order = query.order || "";
  if (page <= last_page) {
    let page_start_index = (page - 1) * data;
    let page_data =
      sql +
      ` order By ${col} ${order} limit ${data} offset ${page_start_index};`;
    // console.log(page_data);
    con.con.query(page_data, function (err, result, fields) {
      if (err) {
        res.render("error_page");
      } else {
        res.render("search/orderby", {
          result: true,
          data: result,
          fields,
          last_page,
          page,
          total_data,
          order,
          col,
          sql,
        });
      }
    });
  } else {
    res.render("error_page");
  }
}

module.exports = router;
