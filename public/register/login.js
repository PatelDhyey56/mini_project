const btn = async () => {
  let form = new FormData(document.getElementById("form"));
  let formdata = Object.fromEntries(form);
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (
    formdata.password == "" ||
    !formdata["email"].match(mailformat) ||
    !formdata["password"].match(passcheck)
  ) {
    console.log("hii");
    document.getElementById(
      "msg"
    ).innerHTML = `<div class="alert alert-danger text-center m-2">Enter valid Data....<div>`;
    preventDefault();
  } else {
    await fetch("http://localhost:8000/user/login", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "post",
      body: JSON.stringify({
        form: formdata,
      }),
    })
      .then(async (e) => {
        console.log(Object.fromEntries(form));
        document.getElementById("msg").style.display = "block";
        console.log(e);
        if (e.status == 200) {
          let msg = await e.json();
          document.getElementById(
            "msg"
          ).innerHTML = `<div class="alert alert-success text-center m-2">Login successfull....<div>`;
          window.location = `http://localhost:8000/`;
        } else if (e.status == 404) {
          let msg = await e.json();
          document.getElementById(
            "msg"
          ).innerHTML = `<div class="alert alert-success text-center m-2">${msg.msg} ....<div>`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
