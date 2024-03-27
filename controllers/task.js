const tictactoe = (req, res) => {
  res.render("task/tic-tac-toe");
};
const cucucube = (req, res) => {
  res.render("task/cucu-cube");
};
const sorting = (req, res) => {
  res.render("task/sorting");
};
const dynamic_table = (req, res) => {
  res.render("task/dynamic-table");
};
const event = (req, res) => {
  res.render("task/event");
};
module.exports = { tictactoe, cucucube, sorting, dynamic_table, event };
