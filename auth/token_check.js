var jwt = require("jsonwebtoken");

const token_check = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, "your-secret-key", (err, valid) => {
      if (err) {
        console.log(err);
        res.render("login");
      } else {
        next();
      }
    });
  } else {
    res.render("login");
  }
};
module.exports = token_check;
