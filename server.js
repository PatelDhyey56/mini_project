var express = require("express");
var app = express();
const { router } = require("./routers/router");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));

var PORT = 8000;

app.listen(PORT, () => {
  try {
    app.use(router);
    console.log(`App listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
