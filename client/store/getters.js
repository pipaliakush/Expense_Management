export default {
  dashboardLineChartExpenseData: state => {
    if (state.dashboardTotal.expense && state.dashboardTotal.expense.length) {
      const newArray = state.dashboardTotal.expense.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  dashboardLineChartIncomeData: state => {
    if (state.dashboardTotal.expense && state.dashboardTotal.income.length) {
      const newArray = state.dashboardTotal.income.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  totalIncome: state => {
    if (state.dashboardTotal.income && state.dashboardTotal.income.length) {
      const val = state.dashboardTotal.income.reduce(function(
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
    if (state.dashboardTotal.expense && state.dashboardTotal.expense.length) {
      const val = state.dashboardTotal.expense.reduce(function(
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
    if (state.sourceDashboard.expense.length) {
      const val = state.sourceDashboard.expense.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataSourceOfExpense: state => {
    if (state.sourceDashboard.expense.length) {
      const val = state.sourceDashboard.expense.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelSourceOfIncome: state => {
    if (state.sourceDashboard.income.length) {
      const val = state.sourceDashboard.income.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataSourceOfIncome: state => {
    if (state.sourceDashboard.income.length) {
      const val = state.sourceDashboard.income.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelCategoryOfIncome: state => {
    if (state.categoryDashboard.income.length) {
      const val = state.categoryDashboard.income.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataCategoryOfIncome: state => {
    if (state.categoryDashboard.income.length) {
      const val = state.categoryDashboard.income.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  },
  labelCategoryOfExpense: state => {
    if (state.categoryDashboard.expense.length) {
      const val = state.categoryDashboard.expense.map(e => {
        return e.name;
      });
      return val;
    } else {
      return [];
    }
  },
  dataCategoryOfExpense: state => {
    if (state.categoryDashboard.expense.length) {
      const val = state.categoryDashboard.expense.map(e => {
        return e.totalAmount;
      });
      return val;
    } else {
      return [];
    }
  }
};
