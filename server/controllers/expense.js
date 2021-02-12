const getExpenses = (req, res, next) => {
  res.status(200).send({ name: "expense" });
};

module.exports = {
  getExpenses,
};
