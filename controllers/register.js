var con = require("../services/database");
var middleware = require("../auth/register_middleware");
var md5 = require("md5");

const getrequest = async (req, res) => {
  let token = req.query.token;
  try {
    if (token) {
      let sql = `select * from login where token="${token}" `;
      let data = await con.sqlfunc(sql);
      if (data.length != 0 && data[0]["user_password"] == null) {
        // console.log(data);
        res.render("registerpass", { token, mail: data[0].email });
      } else {
        res.render("error_page");
      }
    } else {
      res.render("register");
    }
  } catch (e) {
    console.log(e);
  }
};
const postrequest = (req, res) => {
  // console.log(req.body);
  let data = req.body;
  try {
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
  } catch (e) {
    console.log(e);
  }
};

const add_passs = async (req, res) => {
  let data2 = Object.entries(req.body)[0][0];
  // console.log(req.body);
  let data = JSON.parse(data2);
  try {
    const key = Math.random().toString(36).substring(2, 6);
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
          console.log("Password registered...");
        } else {
          res.status(404).json({ msg: "Login again" });
        }
      } else {
        res.status(404).json({ msg: "Not Valid Data" });
      }
    } else {
      res.status(404).json({ msg: "Not Valid Data" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getrequest, postrequest, add_passs };
