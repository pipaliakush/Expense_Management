export default {
  dashboardLineChartExpenseData: state => {
    if (state.dashboardTotal.expense.length) {
      const newArray = state.dashboardTotal.expense.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  dashboardLineChartIncomeData: state => {
    if (state.dashboardTotal.income.length) {
      const newArray = state.dashboardTotal.income.map(item => {
        return { t: item.spentOn, y: item.totalAmount };
      });
      return newArray;
    } else {
      return [];
    }
  },
  totalIncome: state => {
    if (state.dashboardTotal.income.length) {
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
    if (state.dashboardTotal.expense.length) {
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
  }
};
