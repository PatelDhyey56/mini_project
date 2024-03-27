var router = require("express").Router();
var con = require("../database");
var middleware = require("../middleware");
var md5 = require("md5");

router.get("/register", async (req, res) => {
  let token = req.query.token;
  if (token) {
    let sql = `select * from login where token="${token}" `;
    let data = await con.sqlfunc(sql);
    console.log(data);
    if (data.length != 0 && data[0]["user_password"] == null) {
      res.render("registerpass", { token, mail: data[0].email });
    } else {
      res.render("error_page");
    }
  } else {
    res.render("register");
  }
});
router.post("/register", middleware.formvalidator, (req, res) => {
  console.log(req.body);
  let data = req.body;
  let sql1 = `INSERT INTO login (f_name, l_name, email, mobile_no) VALUES ("${data.f_name}","${data.l_name}","${data.email}","${data.Mobile_no}")`;
  con.con.query(sql1, async function (err, result, fields) {
    let errordata = false;
    if (err) {
      errordata = true;
      // console.log(err);
    } else {
      console.log(result.insertId);
      console.log("data submit...");
    }
    if (errordata == true) {
      res.status(400).json({ error: "User already Exist" });
    } else {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      function link() {
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < 12; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      let code = link();
      let sql2 = `update login set token="${code}" where email="${data.email}"`;
      let token = await con.sqlfunc(sql2);
      // console.log(token);
      if (token.length != 0) {
        res.status(200).json({ code: code });
        middleware.deletedata(code);
      } else {
        res.status(404).json({ error: "ENTER VALID TOKEN" });
      }
    }
  });
});

router.post("/register/pass", async (req, res) => {
  // console.log(req.body);
  let data1 = Object.entries(req.body)[0][0];
  let data = JSON.parse(data1);

  const key = Math.random().toString(36).substring(2, 6);
  console.log();
  // console.log(data.form["email"]);
  let password = md5(data.form["password"].concat(key));
  // console.log(password);

  let sql1 = `select * from login where token="${data.token}"`;
  let token = await con.sqlfunc(sql1);
  // console.log(token);
  if (token.length != 0) {
    if (token[0].user_password == null) {
      sql2 = `update login set user_password="${password}",pass_key="${key}" where token="${data.token}"`;
      let password_databasse = await con.sqlfunc(sql2);
      if (password_databasse.length != 0) {
        res.status(200).json({ msg: "Login" });
      } else {
        res.status(404).json({ msg: "Login again" });
      }
    } else {
      res.status(404).json({ msg: "Not Valid Data" });
    }
  } else {
    res.status(404).json({ msg: "Not Valid Data" });
  }
  console.log("login...");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  // res.render("error_page");
  let data1 = Object.entries(req.body)[0][0];
  let data = JSON.parse(data1);
  let pass = data.form.password;
  sql2 = `select * from login where  email="${data["form"].email}" `;
  let user = await con.sqlfunc(sql2);
  // console.log(user[0].pass_key);
  if (user.length != 0) {
    let code = pass.concat(user[0].pass_key);
    let password = md5(code);
    // console.log(password);
    if (user[0].user_password == password) {
      res.status(200).json({ msg: "Login sucessfull" });
    } else {
      res.status(404).json({ msg: "Invalid Credentials" });
    }
  } else {
    res.status(404).json({ msg: "Invalid Credentials" });
  }
});

router.get("/forgotpassword", async (req, res) => {
  res.render("forgotpassword");
});

router.post("/forgotpassword", async (req, res) => {
  let data1 = Object.entries(req.body)[0][0];
  let data = JSON.parse(data1);
  let email = data.form.email;
  let pass = data.form.password;
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
      // console.log(update.changedRows);
      if (update.changedRows == 1) {
        res.status(200).json({
          msg: "Password changed sucessfull",
          token: database[0].token,
        });
      } else {
        res.status(404).json({ msg: "Enter valid Credentials" });
      }
    } else {
      res.status(404).json({ msg: "Enter valid Credentials" });
    }
  } else {
    res.status(404).json({ msg: "Enter valid Credentials" });
  }
});

module.exports = router;
