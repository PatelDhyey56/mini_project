var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dev@123",
  database: "login_form20march",
  dateStrings: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Data Base Connected!");
});
const sqlfunc = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
module.exports = { con, sqlfunc };
