var validator = require("./validators");
const formvalidator = (req, res, next) => {
  try {
    let data = req.body;
    console.log(data);
    let form_titles = [];
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var valid = true;
    var invalid = "";

    for (let i in data) {
      if (i == "notice_time") {
      } else {
        form_titles.push(i);
      }
    }
    for (let i = 0; form_titles.length; i++) {
      let title = form_titles[i];
      // form_titles.map((title) => {
      if (
        title == "company_name1" ||
        title == "company_name2" ||
        title == "company_name3"
      ) {
        let count = 0;
        data[title].map((e) => {
          if (e.length > 0) {
            count++;
          }
        });
        if (count == 0) {
          valid = true;
        } else if (data[title].length > 0 && count < 4) {
          valid = false;
          invalid = title;
          break;
        }
      } else if (
        title == "contect_name1" ||
        title == "contect_name2" ||
        title == "contect_name3"
      ) {
        let count = 0;
        data[title].map((e) => {
          if (e.length > 0) {
            count++;
          }
        });
        if (count == 0) {
          valid = true;
        } else if (count < 3) {
          valid = false;
          invalid = title;
          break;
        }
      } else if (data[title] == "") {
        valid = false;
        invalid = title;
        break;
      } else if (
        title == "f_name" ||
        title == "l_name" ||
        title == "name_of_bord_bachlar" ||
        title == "name_of_bord_hsc" ||
        title == "name_of_bord_master" ||
        title == "name_of_bord_ssc" ||
        title == "prefer_locations"
      ) {
        valid = validator.text_validator(title, data, valid, invalid, res);
        if (valid == false) {
          invalid = title;
          break;
        }
      } else if (title == "email") {
        if (!data[title].match(mailformat)) {
          valid = false;
          invalid = title;
          break;
        }
      } else if (
        title == "Mobile_no" ||
        title == "zip_code" ||
        title == "passing_year_ssc" ||
        title == "passing_year_hsc" ||
        title == "passing_year_bachlar" ||
        title == "passing_year_master" ||
        title == "Percentage_ssc" ||
        title == "Percentage_hsc" ||
        title == "Percentage_bachlar" ||
        title == "Percentage_master" ||
        title == "current_ctc" ||
        title == "expected_ctc"
      ) {
        valid = validator.num_validator(title, data, valid);
        if (title == "Mobile_no" && data[title].length != 10) {
          valid = false;
          invalid = title;
          break;
        }
        if (valid == false) {
          invalid = title;
          break;
        }
      } else if (title == "gujrati" || title == "hindi" || title == "english") {
        valid = validator.checkebox(title, data, valid);
        if (valid == false) {
          invalid = title;
          break;
        }
      } else if (title == "c++" || title == "c#" || title == "java") {
        let radio = title.toLocaleUpperCase();
        if (!data[radio]) {
          valid = false;
          invalid = title;
          break;
        }
      } else if (title == "C++" || title == "C#" || title == "JAVA") {
        let radio = title.toLocaleLowerCase();
        if (!data[radio]) {
          valid = false;
          invalid = title;
          break;
        }
      }
    }
    //   console.log(`\n`);
    console.log(invalid);
    // res.render("home", { error: true, Back_end_invalid: invalid });
    //   //   console.log(data);
    if (valid == true) {
      res.end("Data recived...");
    } else {
      res.end(`Data not recived...\nEnter valid...`);
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { formvalidator };
