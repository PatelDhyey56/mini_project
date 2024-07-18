var mysql = require("mysql");

var con = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "mini-Project",
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
