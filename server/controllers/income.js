const getIncomes = (req, res, next) => {
  res.status(200).send({ name: "income" });
};

module.exports = {
  getIncomes,
};
