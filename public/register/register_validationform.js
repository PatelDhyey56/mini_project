var error = document.getElementById("error");
var timer;
const btn = async () => {
  let valid = validation();
  console.log(valid);
  if (valid.length > 0) {
    error.style.display = "block";
    error.innerHTML = `<div class="alert alert-danger"> ENTER VALID ${valid.toUpperCase()} ....<div>`;
  } else {
    // alert("data recived...");
    error.style.display = "none";
    await fetch("http://localhost:8000/user/register", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "post",
      body: new URLSearchParams(new FormData(document.getElementById("form"))),
    })
      .then(async (e) => {
        // alert("data recived...");
        if (e.status == 404) {
          let err = await e.json();
          error.style.display = "block";
          error.innerHTML = `<div class="alert alert-danger text-center">${err["error"]} ....<div>`;
          document.getElementById(err["error"]).focus();
        } else if (e.status == 400) {
          let err = await e.json();
          error.style.display = "block";
          error.innerHTML = `<div class="alert alert-danger text-center">${err["error"]} ....<div>`;
          document.getElementById(
            "link"
          ).innerHTML = `<div class="btn btn-outline-success"><a class="link-dark text-decoration-none" href="/user/forgotpassword">Forgot password</a><div>`;
        } else if (e.status == 200) {
          error.style.display = "block";
          error.innerHTML = `<div class="alert alert-success text-center"> Data recived ....</div>`;
          let res = await e.json();
          let code = res.code;
          let codelink = `http://localhost:8000/user/register?token=${code}`;
          document.getElementById(
            "link"
          ).innerHTML = `<div class="btn btn-outline-success"><a class="link-dark text-decoration-none" href="${codelink}">${codelink}</a><div>`;
          let time = 60;
          clearInterval(timer);
          timer = setInterval(() => {
            if (time > 0) {
              time--;
              document.getElementById(
                "timer"
              ).innerHTML = `<div class="alert alert-success text-center"n style="width: 250px">Register Time left : ${time}</div>`;
            }
          }, 1000);
          setTimeout(() => {
            document.getElementById("link").innerHTML = ``;
          }, 60 * 1000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
const validation = () => {
  let form = new FormData(document.getElementById("form"));
  let formdata = Object.fromEntries(form);
  let formtitles = Object.keys(formdata);
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let valid = true;
  let errortitle = "";
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
  errortitle.length > 0 ? document.getElementById(errortitle).focus() : "";
  // console.log(formdata);
  return errortitle;
};
