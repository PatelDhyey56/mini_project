var con = require("../services/database");
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const { seret_key } = require("../config");

const getlogin = (req, res) => {
  res.render("login");
};

const postlogin = async (req, res) => {
  // res.render("error_page");
  let data1 = Object.entries(req.body)[0][0];
  let data = JSON.parse(data1);
  let pass = data.form.password;
  try {
    sql2 = `select * from login where  email="${data["form"].email}" `;
    let user = await con.sqlfunc(sql2);
    // console.log(user[0].pass_key);
    if (user.length != 0) {
      let code = pass.concat(user[0].pass_key);
      let password = md5(code);
      // console.log(password);
      if (user[0].user_password == password) {
        console.log("Login sucessfull...");
        const token = jwt.sign({ userId: data["form"].email }, seret_key, {
          expiresIn: "1h",
        });
        // authentication()
        // console.log(`token  : ${token}`);
        res
          .cookie("token", token)
          .status(200)
          .json({ token: token, msg: "Login sucessfull" });
      } else {
        res.status(404).json({ msg: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ msg: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
  }
};

const getforgotpassword = (req, res) => {
  res.render("forgotpassword");
};

const postforgotpassword = async (req, res) => {
  let data1 = Object.entries(req.body)[0][0];
  let data = JSON.parse(data1);
  let email = data.form.email;
  let pass = data.form.password;
  try {
    let sql = `select * from login where email="${email}"`;
    let database = await con.sqlfunc(sql);
    // console.log(database);
    if (database.length != 0) {
      // console.log(database[0]["user_password"]);
      if (database[0]["user_password"] != null) {
        const key = Math.random().toString(36).substring(2, 6);
        let password = md5(pass.concat(key));
        let sql = `update login set user_password="${password}",pass_key="${key}" where email="${email}"`;
        let update = await con.sqlfunc(sql);
        //   console.log(update.changedRows);
        if (update.changedRows == 1) {
          res.status(200).json({
            msg: "Password changed sucessfull",
            token: database[0].token,
          });
          console.log("Password changed...");
        } else {
          res.status(404).json({ msg: "Enter valid Credentials" });
        }
      } else {
        res.status(404).json({ msg: "Enter valid Credentials" });
      }
    } else {
      res.status(404).json({ msg: "Enter valid Credentials" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getlogin, postlogin, getforgotpassword, postforgotpassword };
