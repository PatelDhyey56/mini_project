const getpage = async (req, res) => {
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
};
module.exports = {};
