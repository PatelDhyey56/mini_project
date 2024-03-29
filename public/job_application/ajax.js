var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var Percentage = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/;
let DATE = /\d{4}-\d{2}-\d{2}/;
var error = document.getElementById("error");
// var e = document.getElementById("next");
// console.log(error);
var errortitle = "";

var valid = true;

let obj = {
  page: 0,
  allpages: [],
};
let basic_detail = obj.allpages.push(document.getElementById("basic_detail"));
let education = obj.allpages.push(document.getElementById("education"));
let work = obj.allpages.push(document.getElementById("work_exp"));
let lenguage = obj.allpages.push(document.getElementById("language"));
let technology = obj.allpages.push(document.getElementById("technology"));
let referance = obj.allpages.push(document.getElementById("referance"));
let preference = obj.allpages.push(document.getElementById("preference"));
obj.allpages[obj.page].classList.remove("d-none");

const pre = () => {
  if (obj.page == 0) {
    return;
  }
  obj.allpages[obj.page].classList.add("d-none");
  obj.page--;
  obj.allpages[obj.page].classList.remove("d-none");
};

const next = () => {
  if (obj.page == obj.allpages.length - 1) {
    return;
  }
  validation_page();
  obj.allpages[obj.page].classList.add("d-none");
  obj.page++;
  obj.allpages[obj.page].classList.remove("d-none");
  // console.log(obj.page);
};
const validation_page = () => {
  if (obj.page == 0) {
    let valid = validationpage1();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
    // console.log(valid);
  } else if (obj.page == 1) {
    let valid = validationpage2();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
  } else if (obj.page == 2) {
    let valid = validationpage3();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
  } else if (obj.page == 3) {
    let valid = validationpage4();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
  } else if (obj.page == 4) {
    let valid = validationpage5();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
  } else if (obj.page == 5) {
    let valid = validationpage6();
    if (valid == false) {
      error.style.display = "block";
      error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
      document.getElementById(errortitle).focus();
      preventDefault();
    }
  }
  error.style.display = "none";
};

const validationpage1 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;

  for (let i in basic_details) {
    form_titles.push(i);

    if (i == "dob") {
      break;
    }
  }
  for (let title of form_titles) {
    if (!(title == "designation") && basic_details[title] == "") {
      errortitle = title;
      valid = false;
      break;
    } else {
      if (title == "f_name" || title == "l_name") {
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
          errortitle = title;
          valid = false;
          break;
        }
      } else if (title == "email") {
        if (!basic_details[title].match(mailformat)) {
          errortitle = title;
          valid = false;
          break;
        }
      } else if (title == "dob") {
        if (!basic_details[title].match(DATE)) {
          errortitle = title;
          valid = false;
          break;
        }
      } else if (title == "Mobile_no" || title == "zip_code") {
        if (isNaN(basic_details[title])) {
          errortitle = title;
          valid = false;
          break;
        } else {
          if (title == "Mobile_no" && basic_details[title].length != 10) {
            errortitle = title;
            valid = false;
            break;
          } else if (title == "zip_code" && basic_details[title].length != 6) {
            errortitle = title;
            valid = false;
            break;
          }
        }
      }
    }
  }
  // console.log(basic_details);
  if (!basic_details["gender"]) {
    errortitle = "gender";
    valid = false;
  }
  return valid;
};

const validationpage2 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
    if (i == "Percentage_master") {
      break;
    }
  }
  for (let title of form_titles) {
    if (!(title == "designation") && basic_details[title] == "") {
      errortitle = title;
      valid = false;
      break;
    } else {
      if (
        (title == "Percentage_ssc" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_hsc" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_bachlar" &&
          !basic_details[title].match(Percentage)) ||
        (title == "Percentage_master" &&
          !basic_details[title].match(Percentage))
      ) {
        errortitle = title;
        valid = false;
        break;
      } else if (
        (title == "passing_year_ssc" && basic_details[title].length != 4) ||
        (title == "passing_year_hsc" && basic_details[title].length != 4) ||
        (title == "passing_year_bachlar" && basic_details[title].length != 4) ||
        (title == "passing_year_master" && basic_details[title].length != 4)
      ) {
        errortitle = title;
        valid = false;
        break;
      } else if (
        title == "name_of_bord_bachlar" ||
        title == "name_of_bord_hsc" ||
        title == "name_of_bord_master" ||
        title == "name_of_bord_ssc"
      ) {
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
          errortitle = title;
          valid = false;
          break;
        }
      }
    }
  }
  // console.log(form_titles);
  return valid;
};
const validationpage3 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
    if (i == "company_name") {
      break;
    }
  }
  for (let title of form_titles) {
    if (title == "company_name") {
      let ele = document.getElementsByName(title);
      let buttonval = [];
      for (i = 0; i < ele.length; i = i + 4) {
        let count = 0;
        let numarray = [];
        numarray.push(ele[Number(i) + 2].value);
        numarray.push(ele[Number(i) + 3].value);

        for (j = i; j < i + 4; j++) {
          if (ele[j].value.length > 0) {
            buttonval.push(ele[j].value);
            count++;
          }
        }
        if (count == 0) {
        } else if (count == 4) {
          for (let item of numarray) {
            if (!item.match(DATE)) {
              errortitle = ele[i].name;
              valid = false;
              break;
            }
          }
        } else if (count < 4) {
          errortitle = title;
          valid = false;
          break;
        }
      }
    }
  }
  return valid;
};
const validationpage4 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
    if (i == "ENGLISH") {
      break;
    }
  }
  console.log(form_titles);
  for (let title of form_titles) {
    if (title == "gujrati" || title == "hindi" || title == "english") {
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
        errortitle = title;
        valid = false;
        break;
      }
    } else if (title == "GUJRATI" || title == "HINDI" || title == "ENGLISH") {
      let lowtitle = title.toLowerCase();
      if (!basic_details[lowtitle]) {
        errortitle = title;
        valid = false;
        break;
      }
    }
  }
  return valid;
};
const validationpage5 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
    if (i == "JAVA") {
      break;
    }
  }
  for (let title of form_titles) {
    if (title == "c++" || title == "c#" || title == "java") {
      let radio = title.toLocaleUpperCase();
      if (!basic_details[radio]) {
        errortitle = title;
        valid = false;
        break;
      }
    } else if (title == "C++" || title == "C#" || title == "JAVA") {
      let radio = title.toLocaleLowerCase();
      if (!basic_details[radio]) {
        errortitle = title;
        valid = false;
        break;
      }
    }
  }
  return valid;
};
const validationpage6 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
    if (i == "contect_name") {
      break;
    }
  }
  // console.log(form_titles);
  for (let title of form_titles) {
    if (title == "contect_name") {
      let ele = document.getElementsByName(title);
      let buttonval = [];
      for (i = 0; i < ele.length; i = i + 3) {
        let count = 0;
        for (j = i; j < i + 3; j++) {
          if (ele[j].value.length > 0) {
            buttonval.push(ele[j].value);
            count++;
          }
        }
        // console.log(buttonval);
        if (count == 0) {
        } else if (count == 3) {
          if (ele[Number(i) + 1].value.length != 10) {
            errortitle = ele[i].name;
            valid = false;
            break;
          }
        } else if (count < 3) {
          errortitle = title;
          valid = false;
          break;
        }
      }
    }
  }
  return valid;
};

const validationpage7 = () => {
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  let basic_details = Object.fromEntries(formdata);
  let form_titles = [];
  let valid = true;
  for (let i in basic_details) {
    form_titles.push(i);
  }
  for (let title of form_titles) {
    if (
      !(title == "designation") &&
      !(title == "company_name") &&
      !(title == "contect_name") &&
      basic_details[title] == ""
    ) {
      errortitle = title;
      valid = false;
      break;
    } else if (
      title == "current_ctc" ||
      title == "expected_ctc" ||
      title == "notice_time"
    ) {
      if (isNaN(basic_details[title])) {
        errortitle = title;
        valid = false;
        break;
      }
    } else if (title == "prefer_locations") {
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
        errortitle = title;
        valid = false;
        break;
      }
    }
  }
  return valid;
};
const addworkexp = () => {
  let work = document.getElementById("workexp");
  let companydiv = document.getElementById("companydiv");
  let clon = companydiv.cloneNode(true);
  work.appendChild(clon);
};

const removeworkexp = () => {
  let work = document.getElementById("workexp");
  let ele = work.querySelectorAll("div").length;
  if (ele > 2) {
    work.removeChild(work.lastElementChild);
  }
};
const addrefer = () => {
  let work = document.getElementById("refercon");
  let referdiv = document.getElementById("referdiv");
  let clon = referdiv.cloneNode(true);
  work.appendChild(clon);
};
const removerefer = () => {
  let work = document.getElementById("refercon");
  let ele = work.querySelectorAll("div").length;
  if (ele > 2) {
    work.removeChild(work.lastElementChild);
  }
};

// document.getElementById("submit").addEventListener("click", async (value) => {
const submitdata = async (value, id) => {
  let valid = validationpage7();
  if (valid == false) {
    error.style.display = "block";
    error.innerHTML = `<div class="red"> ENTER VALID ${errortitle.toUpperCase()} ....<div>`;
    document.getElementById(errortitle).focus();
    preventDefault();
  } else {
    error.style.display = "none";
  }
  let form = document.getElementById("form");
  let formdata = new FormData(form);
  const params = new URLSearchParams(formdata);
  const response1 = await new Response(params).text();
  // const response1 = toString(formdata) ;
  console.log(typeof response1);
  console.log(response1);
  if (value == "false") {
    console.log("gfrgfdgdfgdfg");
    var data1 = await fetch(
      `http://localhost:8000/ajax-job-application/update`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: response1,
      }
    );
  } else {
    var data1 = await fetch(
      `http://localhost:8000/ajax-job-application/update/${id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: response1,
      }
    );
  }

  console.log(data1);
  if (data1.status == 200) {
    alert("Data recevied....");
  } else if (data1.status == 400) {
    alert("Enter valid data....");
  } else {
    alert("Data not  recevied....");
  }
};

const show_city = async () => {
  const state = await fetch(
    "http://localhost:8000/ajax-job-application/state/state"
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
  const city = await fetch(
    "http://localhost:8000/ajax-job-application/city/city"
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
  console.log(city);
  state.map((e) => {
    document.getElementById(
      "state"
    ).innerHTML += `<option value="${e.state_name}">${e.state_name}</option>`;
  });
  city.map((e) => {
    document.getElementById(
      "city"
    ).innerHTML += `<option value="${e.city_name}">${e.city_name}</option>`;
  });
};
const changestate = async (state) => {
  const city = await fetch(
    `http://localhost:8000/ajax-job-application/city/city/${state}`
  )
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });
  document.getElementById("city").innerHTML = ``;
  city.map((e) => {
    document.getElementById(
      "city"
    ).innerHTML += `<option value="${e.city_name}">${e.city_name}</option>`;
  });
};
