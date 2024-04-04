var con = require("../services/database");

const getnormalsearch = (req, res) => {
  let query = require("url").parse(req.url, true).query;
  // console.log(query);
  let page = Number(query.page) || 1;
  let data = query.data || 20;
  let search = {
    id: query.id,
    first_name: query.first_name || "",
    last_name: query.last_name || "",
    city: query.city || "",
    type: query.type,
  };
  // console.log(query);
  try {
    let page_start_index = (page - 1) * data;
    let sql = "select * from Student_master";
    if (search.id) {
      sql = sql.toString() + ` where Student_ID like "%${search.id.trim()}"`;
    } else {
      if (search.first_name && search.last_name) {
        sql =
          sql.toString() +
          ` where First_name like "%${search.first_name.trim()}%"  ${
            search.type
          } Last_name like "%${search.last_name.trim()}%" `;
      } else if (search.first_name && search.city) {
        sql =
          sql.toString() +
          ` where First_name like "%${search.first_name.trim()}%"  ${
            search.type
          } City like "%${search.city.trim()}%" `;
      } else if (search.last_name && search.city) {
        sql =
          sql.toString() +
          ` where Last_name like "%${search.last_name.trim()}%"  ${
            search.type
          } City like "%${search.city.trim()}%" `;
      } else if (search.first_name) {
        sql =
          sql.toString() +
          ` where First_name like "%${search.first_name.trim()}%" `;
      } else if (search.last_name) {
        sql =
          sql.toString() +
          ` where Last_name like "%${search.last_name.trim()}%" `;
      } else if (search.city) {
        sql = sql.toString() + ` where City like "%${search.city.trim()}%" `;
      }
    }
    // console.log(sql);
    con.con.query(sql, function (err, result1, fields) {
      if (err) {
        console.log(err);
        res.status(404).send("Error in data...");
      } else {
        let total_row = result1.length;
        let last_page = Math.ceil(total_row / data);
        if (page <= last_page) {
          let query2 =
            sql.toString() + ` limit ${data} offset ${page_start_index};`;
          // console.log(query2);
          con.con.query(query2, function (err, result, fields) {
            if (err) {
              console.log(err);
              res.status(404).send("Error in data...");
            } else {
              res.render("search/normal_search", {
                fields: fields,
                data: result,
                page,
                total_data: total_row,
                last_page,
              });
            }
          });
        } else {
          console.log(err);
          res.status(404).send("Error in data...");
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const dalimetersearch = (req, res) => {
  try {
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
      let sub_string = string.replaceAll(" ", "");
      let pos = sub_string
        // .replaceAll("_", "{")
        // .replaceAll("^", "{")
        // .replaceAll("$", "{")
        // .replaceAll("[", "{")
        // .replaceAll("]", "{")
        // .replaceAll(":", "{")
        .split(/[_^${}:]/);
      pos.shift();
      for (let i = 0; i < sub_string.length; i++) {
        for (let j = 0; j < special_char.length; j++) {
          if (sub_string.charAt(i) == special_char[j]) {
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
    let page = Number(query.page) || 1;
    let data = query.data || 15;
    let page_start_index = (page - 1) * data;
    con.con.query(sql, function (err, result1, fields) {
      if (err) {
        // console.log(err);
        res.status(404).send("Error in data...");
      } else {
        let total_row = result1.length;
        var last_page = Math.ceil(total_row / data);
        if (page <= last_page) {
          let query2 =
            sql.toString() + ` limit ${data} offset ${page_start_index};`;
          // console.log(query2);
          con.con.query(query2, function (err, result, fields) {
            if (err) {
              console.log(err);
              res.status(404).send("Error in data...");
            } else {
              res.render("search/delimiter_search", {
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
          res.status(404).send("Error in data...");
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = { getnormalsearch, dalimetersearch };
