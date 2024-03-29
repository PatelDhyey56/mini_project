const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  seret_key: process.env.SECRET_KEY,
};
