const tictactoe = (req, res) => {
  res.render("js_task/tic-tac-toe");
};
const cucucube = (req, res) => {
  res.render("js_task/cucu-cube");
};
const sorting = (req, res) => {
  res.render("js_task/sorting");
};
const dynamic_table = (req, res) => {
  res.render("js_task/dynamic-table");
};
const event = (req, res) => {
  res.render("js_task/event");
};
module.exports = { tictactoe, cucucube, sorting, dynamic_table, event };
