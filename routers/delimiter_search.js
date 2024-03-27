var router = require("express").Router();
var con = require("../services/database");

router.get("/", (req, res) => {
  var query = require("url").parse(req.url, true).query;
  let special_char = ["_", "^", "$", "{", "}", ":"];
  let enter_data = {
    id_array: [],
    first_array: [],
    last_array: [],
    email_array: [],
    mobile_array: [],
    city_array: [],
  };
  let pos_schar = [];

  let string = query.search;
  if (string) {
    let pos = string
      // .replaceAll("_", "{")
      // .replaceAll("^", "{")
      // .replaceAll("$", "{")
      // .replaceAll("[", "{")
      // .replaceAll("]", "{")
      // .replaceAll(":", "{")
      .split(/[_^${}:]/);
    pos.shift();
    for (let i = 0; i < string.length; i++) {
      for (let j = 0; j < special_char.length; j++) {
        if (string.charAt(i) == special_char[j]) {
          pos_schar.push(special_char[j]);
        }
      }
    }
    for (let i = 0; i < pos_schar.length; i++) {
      if (pos_schar[i] == "_") {
        enter_data.id_array.push(pos[i]);
      } else if (pos_schar[i] == "^") {
        enter_data.first_array.push(pos[i]);
      } else if (pos_schar[i] == "$") {
        enter_data.last_array.push(pos[i]);
      } else if (pos_schar[i] == "[") {
        enter_data.email_array.push(pos[i]);
      } else if (pos_schar[i] == "]") {
        enter_data.mobile_array.push(pos[i]);
      } else if (pos_schar[i] == ":") {
        enter_data.city_array.push(pos[i]);
      }
    }
    // console.log(pos);
    // console.log(pos_schar);
    // console.log(enter_data);
    const multi = (err, name) => {
      let sql = "";
      if (err.length > 0) {
        sql = `${name} like "${err[0]}%" `;
        for (let i = 1; i < err.length; i++) {
          sql += ` or ${name} like "${err[i]}%"`;
        }
      } else {
        sql = ` ${name} like "%"`;
      }
      return sql;
    };
    let Student_ID = multi(enter_data.id_array, "Student_ID");
    let First_name = multi(enter_data.first_array, "First_name");
    let Last_name = multi(enter_data.last_array, "Last_name");
    let Email = multi(enter_data.email_array, "Email");
    let Mobile_no = multi(enter_data.mobile_array, "Mobile_no");
    let City = multi(enter_data.city_array, "City");

    var sql = `select * from  Student_master where  ${Student_ID} and ${First_name} and ${Last_name} and ${Email} and ${Mobile_no} and ${City}`;
  } else {
    var sql = `select * from  Student_master`;
  }
  //   console.log(sql);
  let page = Number(query.page) || 1;
  let data = query.data || 15;
  let page_start_index = (page - 1) * data;
  con.con.query(sql, function (err, result1, fields) {
    if (err) {
      res.render("error_page");
    } else {
      let total_row = result1.length;
      var last_page = Math.ceil(total_row / data);
      if (page <= last_page) {
        let query2 =
          sql.toString() + ` limit ${data} offset ${page_start_index};`;
        // console.log(query2);
        con.con.query(query2, function (err, result, fields) {
          if (err) {
            res.render("error_page");
          } else {
            res.render("delimiter_search/home", {
              fields: fields,
              data: result,
              string,
              page,
              total_data: total_row,
              last_page,
            });
          }
        });
      } else {
        res.render("error_page");
      }
    }
  });
});

module.exports = router;
