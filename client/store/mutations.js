export default {
  helloMutation(state, str) {
    state.hello = str;
  },
  setUser(state, value) {
    state.user = value;
  },
  categories(state, result) {
    state.categoriesList = result;
  },
  sources(state, result) {
    state.sourcesList = result;
  },
  isLoading(state, value) {
    state.isLoading = value;
  },
  transactions(state, result) {
    state.transactionsList = result;
  },
  transaction(state, result) {
    state.singleTransactionList = result;
  },
  selectedImage(state, result) {
    state.selectedImage = result;
  },
  dashboardTotal(state, result) {
    state.dashboardTotal = result;
  },
  sourceDashboard(state, result) {
    state.sourceDashboard = result;
  },
  categoryDashboard(state, result) {
    state.categoryDashboard = result;
  },
  getDashboardData(state, result) {
    state.dashboard = result;
  }
};
