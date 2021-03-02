export function generateQueryForTransaction({ filterBy, startDate, endDate }) {
  const _queryString = [];

  const filterByIds = ["all", "expense", "income"];
  if (filterBy && filterByIds.includes(filterBy)) {
    _queryString.push(`filterBy=${filterBy}`);
  } else {
    _queryString.push(`filterBy=all`);
  }

  if (startDate && startDate != null && startDate != undefined) {
    _queryString.push(`startDate=${startDate}`);
  }

  if (endDate && endDate != null && endDate != undefined) {
    _queryString.push(`endDate=${endDate}`);
  }

  return _queryString.join("&");
}
