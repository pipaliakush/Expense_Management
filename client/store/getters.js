export default {
  dashboardLineChartExpenseData: state => {
    if (state.dashboard.expense && state.dashboard.expense.length) {
      const newArray = state.dashboard.expense.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  dashboardLineChartIncomeData: state => {
    if (state.dashboard.expense && state.dashboard.income.length) {
      const newArray = state.dashboard.income.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  totalIncome: state => {
    if (state.dashboard.income && state.dashboard.income.length) {
      const val = state.dashboard.income.reduce(function(
        previousValue,
        currentValue
      ) {
        return {
          totalAmount: previousValue.totalAmount + currentValue.totalAmount
        };
      });
      return val;
    } else {
      return { totalAmount: 0 };
    }
  },
  totalExpense: state => {
    if (state.dashboard.expense && state.dashboard.expense.length) {
      const val = state.dashboard.expense.reduce(function(
        previousValue,
        currentValue
      ) {
        return {
          totalAmount: previousValue.totalAmount + currentValue.totalAmount
        };
      });
      return val;
    } else {
      return { totalAmount: 0 };
    }
  },
  labelSourceOfExpense: state => {
    if (state.dashboard.sourceExpanse.length) {
      const val = state.dashboard.sourceExpanse.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataSourceOfExpense: state => {
    if (state.dashboard.sourceExpanse.length) {
      const val = state.dashboard.sourceExpanse.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelSourceOfIncome: state => {
    if (state.dashboard.sourceIncome.length) {
      const val = state.dashboard.sourceIncome.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataSourceOfIncome: state => {
    if (state.dashboard.sourceIncome.length) {
      const val = state.dashboard.sourceIncome.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelCategoryOfIncome: state => {
    if (state.dashboard.categoryIncome.length) {
      const val = state.dashboard.categoryIncome.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataCategoryOfIncome: state => {
    if (state.dashboard.categoryIncome.length) {
      const val = state.dashboard.categoryIncome.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelCategoryOfExpense: state => {
    if (state.dashboard.categoryExpense.length) {
      const val = state.dashboard.categoryExpense.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataCategoryOfExpense: state => {
    if (state.dashboard.categoryExpense.length) {
      const val = state.dashboard.categoryExpense.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  }
};
