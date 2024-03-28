var error = document.getElementById("error");
var errortitle = "";
const redalert = document.createElement("span");

var valid = true;

document.getElementById("form").addEventListener("submit", (e) => {
  let form_titles = [];
  let form = new FormData(e.target);
  let basic_details = Object.fromEntries(form);
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var Percentage = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/;
  let DATE = /\d{4}-\d{2}-\d{2}/;

  // console.log(basic_details["ENGLISH"]);
  console.log(basic_details);

  for (let i in basic_details) {
    if (i == "notice_time" || i == "designation") {
    } else {
      form_titles.push(i);
    }
  }

  console.log(form_titles);

  const checkebox = (title) => {
    let button = title.toUpperCase();
    let ele = document.getElementsByName(button);
    let buttonval = [];
    let count = 0;
    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        buttonval.push(ele[i].value);
        count++;
      }
    }
    if (count == 0) {
      e.preventDefault();
      errortitle = title;
      valid = false;
    }
  };
  const text_validator = (title) => {
    if (
      basic_details[title].includes("0") ||
      basic_details[title].includes("1") ||
      basic_details[title].includes("2") ||
      basic_details[title].includes("3") ||
      basic_details[title].includes("4") ||
      basic_details[title].includes("5") ||
      basic_details[title].includes("6") ||
      basic_details[title].includes("7") ||
      basic_details[title].includes("8") ||
      basic_details[title].includes("9")
    ) {
      e.preventDefault();
      errortitle = title;
      valid = false;
    }
  };
  const num_validator = (title) => {
    if (isNaN(basic_details[title])) {
      e.preventDefault();
      errortitle = title;
      valid = false;
    } else {
      if (title == "Mobile_no" && basic_details[title].length != 10) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      } else if (
        (title == "Percentage_ssc" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_hsc" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_bachlar" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_master" &&
          !basic_details[title].match(Percentage))
      ) {
        console.log(basic_details[title]);
        e.preventDefault();
        errortitle = title;
        valid = false;
      } else if (
        (title == "passing_year_ssc" && basic_details[title].length != 4) ||
        (title == "passing_year_hsc" && basic_details[title].length != 4) ||
        (title == "passing_year_bachlar" && basic_details[title].length != 4) ||
        (title == "passing_year_master" && basic_details[title].length != 4)
      ) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    }
  };
  // for (let i = 0; form_titles.length; i++) {
  // let title = form_titles[i];
  form_titles.map((title) => {
    if (
      title == "company_name1" ||
      title == "company_name2" ||
      title == "company_name3"
    ) {
      let ele = document.getElementsByName(title);
      let buttonval = [];
      let count = 0;
      for (i = 0; i < ele.length; i++) {
        if (ele[i].value.length > 0) {
          if (i == 2 || i == 3) {
            if (!ele[i].value.match(DATE)) {
              e.preventDefault();
              errortitle = title;
              valid = false;
            }
          }
          buttonval.push(ele[i].value);
          count++;
        }
      }
      console.log(buttonval);
      if (buttonval.length == 0) {
      } else if (count < 4) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (
      title == "contect_name1" ||
      title == "contect_name2" ||
      title == "contect_name3"
    ) {
      let ele = document.getElementsByName(title);
      let buttonval = [];
      let count = 0;
      for (i = 0; i < ele.length; i++) {
        if (ele[i].value.length > 0) {
          if (i == 1) {
            if (ele[i].value.length != 10) {
              e.preventDefault();
              errortitle = title;
              valid = false;
            }
          }
          buttonval.push(ele[i].value);
          count++;
        }
      }
      // console.log(buttonval);
      if (count == 0) {
      } else if (count < 3) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (basic_details[title] == "") {
      e.preventDefault();
      errortitle = title;
      valid = false;
    } else if (
      title == "f_name" ||
      title == "l_name" ||
      title == "name_of_bord_bachlar" ||
      title == "name_of_bord_hsc" ||
      title == "name_of_bord_master" ||
      title == "name_of_bord_ssc" ||
      title == "prefer_locations"
    ) {
      text_validator(title);
    } else if (title == "email") {
      if (!basic_details[title].match(mailformat)) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (title == "dob") {
      if (!basic_details[title].match(DATE)) {
        e.preventDefault();
        errortitle = title;
        valid = false;
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
      num_validator(title);
      if (title == "Mobile_no" && basic_details[title].length != 10) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (title == "gujrati" || title == "hindi" || title == "english") {
      checkebox(title);
    } else if (title == "c++" || title == "c#" || title == "java") {
      let radio = title.toLocaleUpperCase();
      if (!basic_details[radio]) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (title == "C++" || title == "C#" || title == "JAVA") {
      let radio = title.toLocaleLowerCase();
      if (!basic_details[radio]) {
        e.preventDefault();
        errortitle = title;
        valid = false;
      }
    } else if (title == "gender") {
      console.log("hii");
    }
  });

  console.log(basic_details);
  valid == false
    ? (error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`)
    : "";
});
