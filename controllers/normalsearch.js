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
      sql = sql.toString() + ` where Student_ID in(${search.id}) `;
    } else {
      if (search.first_name && search.last_name) {
        sql =
          sql.toString() +
          ` where First_name like "%${search.first_name}%"  ${search.type} Last_name like "%${search.last_name}%" `;
      } else if (search.first_name && search.city) {
        sql =
          sql.toString() +
          ` where First_name like "%${search.first_name}%"  ${search.type} City like "%${search.city}%" `;
      } else if (search.last_name && search.city) {
        sql =
          sql.toString() +
          ` where Last_name like "%${search.last_name}%"  ${search.type} City like "%${search.city}%" `;
      } else if (search.first_name) {
        sql =
          sql.toString() + ` where First_name like "%${search.first_name}%" `;
      } else if (search.last_name) {
        sql = sql.toString() + ` where Last_name like "%${search.last_name}%" `;
      } else if (search.city) {
        sql = sql.toString() + ` where City like "%${search.city}%" `;
      }
    }
    // console.log(sql);
    con.con.query(sql, function (err, result1, fields) {
      if (err) {
        res.render("error_page");
      } else {
        let total_row = result1.length;
        let last_page = Math.ceil(total_row / data);
        if (page <= last_page) {
          let query2 =
            sql.toString() + ` limit ${data} offset ${page_start_index};`;
          // console.log(query2);
          con.con.query(query2, function (err, result, fields) {
            if (err) {
              res.render("error_page");
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
          res.render("error_page");
          res.end();
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getnormalsearch };
