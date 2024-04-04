var con = require("../services/database");

const getdatabse = (req, res) => {
  try {
    var query = require("url").parse(req.url, true).query;
    if (!query.page) {
      res.render("database_name/home", { result: false });
    } else {
      // console.log(req.query);
      let sql = String(query.sql);
      let total_data = Number(query.total_data);
      let col1 = query.col1;
      // console.log(col1);
      search_page(req, res, total_data, col1, sql);
    }
  } catch (e) {
    console.log(e);
  }
};

const postdatabase = (req, res) => {
  let sql = req.body.sql;
  // console.log(sql);
  try {
    if (req.body.id) {
      con.con.query(sql, function (err, result, fields) {
        if (err) {
          res.render("error_page");
        } else {
          let sql1 = `${req.body.sql} where ${fields[0].name} = "${req.body.id}"`;
          con.con.query(sql1, function (err, result1, fields) {
            if (err) {
              res.render("error_page");
            } else {
              // console.log(result1);
              search_page(req, res, result1.length, fields[0].name, sql1);
            }
          });
        }
      });
    } else {
      con.con.query(sql, function (err, result, fields) {
        if (err) {
          res.render("error_page");
        } else {
          // console.log(fields[0].name);
          search_page(req, res, result.length, fields[0].name, sql);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

function search_page(req, res, total_data, col1, sql) {
  try {
    var query = require("url").parse(req.url, true).query;
    let page = Number(query.page) || 1;
    let data = query.data || 20;
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
          console.log(" no data....");
        } else {
          // console.log("data....");
          res.render("database_name/home", {
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
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getdatabse, postdatabase };
