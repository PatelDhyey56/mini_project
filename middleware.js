var con = require("./database");
var validator = require("./validators");
const formvalidator = (req, res, next) => {
  let formdata = req.body;
  let formtitles = Object.keys(formdata);
  let valid = true;
  let errortitle = "";

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  for (let title of formtitles) {
    if (formdata[title] == "") {
      errortitle = title;
      valid = false;
      break;
    } else if (title == "f_name" || title == "l_name") {
      if (
        formdata[title].includes("0") ||
        formdata[title].includes("1") ||
        formdata[title].includes("2") ||
        formdata[title].includes("3") ||
        formdata[title].includes("4") ||
        formdata[title].includes("5") ||
        formdata[title].includes("6") ||
        formdata[title].includes("7") ||
        formdata[title].includes("8") ||
        formdata[title].includes("9")
      ) {
        errortitle = title;
        valid = false;
        break;
      }
    } else if (title == "email") {
      if (!formdata[title].match(mailformat)) {
        errortitle = title;
        valid = false;
        break;
      }
    }
    if (title == "Mobile_no" && formdata[title].length != 10) {
      errortitle = title;
      valid = false;
      break;
    }
  }
  if (valid == false) {
    res.status(404).json({ error: errortitle });
    console.log(`error : ${errortitle}`);
  } else {
    next();
  }
};
const deletedata = (code) => {
  setTimeout(async () => {
    let pass = `select id,user_password from login where token="${code}"`;
    let password = await con.sqlfunc(pass);
    console.log(password);
    if (password.length != 0) {
      if (password[0].password === null) {
        let sql1 = `delete from login where token="${code}" `;
        await con.sqlfunc(sql1);
        console.log("data deleted...");
      }
    }
  }, 60 * 1000);
};
module.exports = { formvalidator, deletedata };
