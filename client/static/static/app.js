export function generateQueryForTransaction({ filterBy }) {
  const _queryString = [];

  const filterByIds = ["all", "expenses", "incomes"];
  if (filterBy && filterByIds.includes(filterBy)) {
    _queryString.push(`filterBy=${filterBy}`);
  } else {
    _queryString.push(`filterBy=all`);
  }

  return _queryString.join("&");
}
