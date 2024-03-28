var Percentage = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/;
const checkebox = (title, data, valid) => {
  //   let button = title.toUpperCase();
  //   let ele = document.getElementsByName(button);
  //   let buttonval = [];
  //   let count = 0;
  //   for (i = 0; i < ele.length; i++) {
  //     if (ele[i].checked) {
  //       buttonval.push(ele[i].value);
  //       count++;
  //     }
  //   }
  //   if (count == 0) {
  //     valid = false;
  //   }
  //   let count = 0;
  //   data[title].map((e) => {
  //     if (e.length > 0) {
  //       count++;
  //     }
  //   });
  //   if (count == 0) {
  //     valid = true;
  //   } else if (count < 4) {
  //     valid = false;
  //   }
  return valid;
};
const text_validator = (title, data, valid) => {
  if (
    data[title].includes("0") ||
    data[title].includes("1") ||
    data[title].includes("2") ||
    data[title].includes("3") ||
    data[title].includes("4") ||
    data[title].includes("5") ||
    data[title].includes("6") ||
    data[title].includes("7") ||
    data[title].includes("8") ||
    data[title].includes("9")
  ) {
    valid = false;
  }
  return valid;
  //   return res.render("home", { error: true, Back_end_invalid: invalid });
};
const num_validator = (title, data, valid) => {
  if (isNaN(data[title])) {
    valid = false;
  } else {
    if (title == "Mobile_no" && data[title].length != 10) {
      valid = false;
    } else if (
      (title == "Percentage_ssc" && !data[title].match(Percentage)) ||
      (title == "Percentage_hsc" && !data[title].match(Percentage)) ||
      (title == "Percentage_bachlar" && !data[title].match(Percentage)) ||
      (title == "Percentage_master" && !data[title].match(Percentage))
    ) {
      valid = false;
    } else if (
      (title == "passing_year_ssc" && data[title].length != 4) ||
      (title == "passing_year_hsc" && data[title].length != 4) ||
      (title == "passing_year_bachlar" && data[title].length != 4) ||
      (title == "passing_year_master" && data[title].length != 4)
    ) {
      valid = false;
    }
  }
  return valid;
};

module.exports = { checkebox, text_validator, num_validator };
