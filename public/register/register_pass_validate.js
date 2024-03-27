const btn = async () => {
  let form = new FormData(document.getElementById("form"));
  let formdata = Object.fromEntries(form);
  var passcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  console.log(Object.fromEntries(form));
  if (formdata.password == "" || formdata.password != formdata.repassword) {
    document.getElementById(
      "query"
    ).innerHTML = `<div class="alert alert-danger text-center m-2">Enter valid password ....<div>`;
    preventDefault();
  } else {
    if (!formdata["repassword"].match(passcheck)) {
      console.log("hi");
      document.getElementById(
        "query"
      ).innerHTML = `<div class="alert alert-danger text-center m-2">Enter  Strong password ....<div>`;
    } else {
      document.getElementById("msg").style.display = "none";
      await fetch("http://localhost:8000/user/register/pass", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        body: JSON.stringify({
          form: formdata,
          token: "<%=token%>",
        }),
      })
        .then(async (e) => {
          document.getElementById("msg").style.display = "block";
          console.log(e);
          if (e.status == 200) {
            let msg = await e.json();
            document.getElementById(
              "query"
            ).innerHTML = `<div class="alert alert-success text-center m-2">${msg.msg} ....<div>`;
            window.location = `http://localhost:8000/user/login`;
          } else if (e.status == 404) {
            let msg = await e.json();
            document.getElementById(
              "query"
            ).innerHTML = `<div class="alert alert-success text-center m-2">${msg.msg} ....<div>`;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
};
