var express = require("express");
var app = express();

const { router } = require("./routers/router");
const { port } = require("./config");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var PORT = port || 8000;

app.listen(PORT, () => {
  try {
    app.use(router);
    console.log(`App listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
